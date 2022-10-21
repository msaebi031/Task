import React, { useState, useMemo, useEffect, Fragment } from "react";
import axios from "axios";
import Loading from "../Loading";
import { errorTost, successTost } from "../utils/reactTostify";

import ReactCountryFlag from "react-country-flag";
import { Country, State } from "country-state-city";

import {
  Box,
  Button,
  Container,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { ReplayRounded } from "@mui/icons-material";
import Link from "next/link";

const Forms = () => {
  // ======= useState ======= //
  const [country, setCountry] = useState("IR");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const [loading, setLoading] = useState(true);
  // ======= useMemo ======= //
  const countries = useMemo(() => Country.getAllCountries(), []);
  const citys = useMemo(() => State.getStatesOfCountry(country), [country]);
  // ======= useEffect ======= //
  useEffect(() => {
    getGeoInfo();
  }, []);

  // ======= Handels ======= //
  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setCountry(data.country);
        setCity(data.country_capital);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCkeckImage = (e) => {
    if (e.size > 5000000) {
      return errorTost("The file size is more than 5 MB!");
    }
    if (
      e.type != "image/jpeg" &&
      e.type != "image/png" &&
      e.type != "image/svg"
    ) {
      return errorTost(
        "You are only allowed to upload files in jpg , png , svg format!"
      );
    }
    setSelectedImage(e);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (country && city && name && selectedImage) {
      setLoading(true);
      const Formdata = new FormData();
      Formdata.append("media", selectedImage);
      Formdata.append("name", name);
      Formdata.append("country", country);
      Formdata.append("city", city);
      await axios.post("/upload", Formdata);
      setLoading(false);
      successTost("It was successfully built");
    } else {
      errorTost("Please fill in all the fields!");
    }
  };

  // ======= Code Return ======= //
  return (
    <Fragment>
      {/* Loading */}
      {loading ? (
        <Loading />
      ) : (
        <Container component="main" maxWidth="sm">
          {/* Form User */}

          <Box
            py={3}
            px={{ xs: 2, sm: 5 }}
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.12)"
            display="flex"
            flexDirection="column"
            alignItems="center"
            className="screen"
            width={{ xs: "80%", sm: "60%", md: "40%" }}
          >
            <Typography
              component="h1"
              variant="h5"
              className="font-bold"
              pb={2}
            >
              User Input
            </Typography>
            <Box
              textAlign="left"
              component="form"
              onSubmit={handleSubmit}
              mt={1}
              noValidate
              width={"100%"}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                input={
                  <OutlinedInput
                    value={country}
                    fullWidth
                    sx={{ mb: 3 }}
                    placeholder="country"
                    color="secondary"
                  />
                }
              >
                {countries.map((item, index) => (
                  <MenuItem key={index} value={item.isoCode}>
                    <ReactCountryFlag
                      countryCode={item.isoCode}
                      svg
                      className="p-country"
                    />
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              {citys.length > 0 ? (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  input={
                    <OutlinedInput
                      fullWidth
                      value={city}
                      placeholder="city"
                      color="secondary"
                    />
                  }
                >
                  {citys.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <OutlinedInput
                  fullWidth
                  placeholder="Please Type Your State ..."
                  color="secondary"
                  onChange={(event) => setCity(event.target.value)}
                />
              )}

              <OutlinedInput
                fullWidth
                placeholder="First Name and Last Name"
                name="name"
                autoComplete="name"
                autoFocus
                className="margin-input"
                color="secondary"
                onChange={(e) => setName(e.target.value)}
              />

              <Button
                sx={{ mb: 3, mt: 1.5 }}
                variant="contained"
                component="label"
                fullWidth
                color={selectedImage ? "gray" : "secondary"}
                className="img-input-news"
                startIcon={
                  selectedImage ? <ReplayRounded sx={{ pl: 1 }} /> : null
                }
              >
                {selectedImage ? "Edit photo Profail" : "Upload Photo Profail"}

                <input
                  type="file"
                  name="uploaded_file"
                  aria-describedby="uploaded_file"
                  hidden
                  onChange={(event) => {
                    handleCkeckImage(event.target.files[0]);
                  }}
                />
              </Button>

              <Button
                size="large"
                type="submit"
                fullWidth
                color="success"
                variant="contained"
                sx={{ mb: 2 }}
              >
                Record
              </Button>
            </Box>
            {/* Link List */}
            <Link href="/list">Show All User</Link>
          </Box>
          {/* Form User */}
        </Container>
      )}
    </Fragment>
  );
};

export default Forms;
