import Container from "@mui/material/Container";
import { Card, CardContent, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { MessagePage } from "./MessagePage.tsx";
import { useGetUserListQuery } from "../../app/store/api/MainApi.ts";

export const MessagesPage = () => {
  const { data: userListData } = useGetUserListQuery();
  const [recipient, setRecipient] = useState<{
    recipientId: number;
    login: string;
  } | null>(null);

  if (recipient)
    return <MessagePage recipient={recipient} setRecipient={setRecipient} />;

  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="md">
      <Typography component="h6" variant="h5">
        Dialogues
      </Typography>
      <Grid container spacing={4}>
        {userListData?.map((user) => (
          <Grid item sm={12} xs={12} md={12} key={user.userId}>
            <Card
              sx={{ display: "flex" }}
              onClick={() => {
                setRecipient({ recipientId: user.userId, login: user.login });
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography
                  component="h2"
                  variant="h5"
                  style={{ maxHeight: "28px", overflow: "hidden" }}
                >
                  {user.login}
                </Typography>
                <Typography>UserId: {user.userId}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
