import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { setAuth, UserRole } from "../../app/store/slices/authSlice.ts";
import { LockOpenOutlined, LockOutlined } from "@mui/icons-material";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../app/store/api/MainApi.ts";
import { useSnackbar } from "notistack";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { formDataToObject } from "../../shared/utils/formDataToObject.ts";
import { decodeJWT } from "../../shared/utils/decodeJWT.ts";

export function LoginPage() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [login] = useLoginUserMutation();
  const [register] = useRegisterUserMutation();

  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<UserRole>("BUYER");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const object: any = formDataToObject(data);

    if (!isRegister) {
      try {
        const response = await login({
          login: object.login,
          password: object.password,
        }).unwrap();

        enqueueSnackbar("Login successfully", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });

        const decodedToken = decodeJWT(response.token);

        dispatch(
          setAuth({
            userId: decodedToken.userId,
            role: decodedToken.role,
            token: response.token,
          }),
        );
      } catch (e: any) {
        enqueueSnackbar(e.data.description, {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    } else {
      try {
        const response = await register(object).unwrap();

        enqueueSnackbar("Registered successfully", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });

        const decodedToken = decodeJWT(response.token);

        dispatch(
          setAuth({
            userId: decodedToken.userId,
            role: decodedToken.role,
            token: response.token,
          }),
        );

        setIsRegister(false);
      } catch (e: any) {
        enqueueSnackbar(e.data.description, {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {isRegister ? <LockOpenOutlined /> : <LockOutlined />}
          </Avatar>
          <Typography component="h1" variant="h5">
            {isRegister ? "Register" : "Log In"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isRegister && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last name"
                  name="lastname"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First name"
                  name="firstname"
                />
                <FormControl fullWidth margin={"normal"}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId={"role-label"}
                    id="role"
                    value={role}
                    required
                    label="Role"
                    onChange={(event: SelectChangeEvent) =>
                      setRole(event.target.value as UserRole)
                    }
                    name={"role"}
                  >
                    <MenuItem value={"BUYER"}>Buyer</MenuItem>
                    <MenuItem value={"SELLER"}>Seller</MenuItem>
                    <MenuItem value={"ADMIN"}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoFocus
            />
            {isRegister && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type={"email"}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            {isRegister && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="password-confirm"
                label="Password Confirm"
                type="password-confirm"
                id="password-confirm"
                autoComplete="password-confirm"
                hidden={!isRegister}
              />
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              {isRegister ? "Register" : "Log In"}
            </Button>
            <Button
              variant={"outlined"}
              onClick={() => setIsRegister((prev) => !prev)}
            >
              {isRegister
                ? "Already have an account? Log In"
                : "Don't have an account? Register"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
