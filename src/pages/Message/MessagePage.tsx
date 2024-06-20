import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  useGetDialogueQuery,
  useSendMessageMutation,
} from "../../app/store/api/MainApi";
import { useSelector } from "react-redux";
import { selectUserId } from "../../app/store/slices/authSlice.ts";
import { useState } from "react";
import Button from "@mui/material/Button";
import { ArrowLeft, RefreshOutlined, SendOutlined } from "@mui/icons-material";
import TextField from "@mui/material/TextField";

function formatISODate(input: string): string {
  // Create a Date object from the input string
  const date = new Date(input);

  // Format each part of the date and time as needed
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Construct the formatted date string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const MessagePage = ({
  recipient,
  setRecipient,
}: {
  recipient: { login: string; recipientId: number };
  setRecipient: (val: null) => void;
}) => {
  const userId = useSelector(selectUserId);
  const [message, setMessage] = useState("");

  const { data: dialogueData, refetch } = useGetDialogueQuery(
    {
      senderId: userId as number,
      recipientId: recipient.recipientId,
    },
    { skip: !userId || userId === recipient.recipientId },
  );
  const [sendMessage] = useSendMessageMutation();

  const onSendMessage = () => {
    if (message === "") return;
    sendMessage({
      senderId: userId as number,
      recipientId: recipient.recipientId,
      text: message,
    });
    setMessage("");
  };

  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="md">
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Button onClick={() => setRecipient(null)}>
          <ArrowLeft
            sx={{
              border: 1,
              borderRadius: 6,
            }}
            className={"button-icon"}
          />
        </Button>
        <Button
          onClick={() => refetch()}
          variant={"text"}
          className={"borderless"}
        >
          <RefreshOutlined
            sx={{
              border: 1,
              borderRadius: 6,
            }}
            className={"button-icon"}
          />
        </Button>
      </Box>
      <Typography component="h6" variant="h5" sx={{ pl: 2 }}>
        Dialogue with {recipient.login} (userId: {recipient.recipientId})
      </Typography>
      {userId === recipient.recipientId ? (
        <Box>You can't write to yourself (testing version)</Box>
      ) : (
        <Box
          sx={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #cccccc",
            p: "12px",
            m: "12px",
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[...(dialogueData ?? [])]
              ?.sort(function (a, b) {
                return (
                  (new Date(a.timestamp) as any) -
                  (new Date(b.timestamp) as any)
                );
              })
              .map((message) => (
                <Box
                  sx={{
                    p: "8px",
                    m: "8px",
                    borderRadius: "8px",
                    backgroundColor:
                      userId === message.sender.userId
                        ? "lightgreen"
                        : "#cccccc",
                    maxWidth: "72%",
                    alignSelf:
                      userId === message.sender.userId
                        ? "self-end"
                        : "self-start",
                  }}
                >
                  <Typography>{message.text}</Typography>
                  <Typography
                    color="text.secondary"
                    fontSize={"10px"}
                    textAlign={"right"}
                  >
                    {formatISODate(message.timestamp)}
                  </Typography>
                </Box>
              ))}
          </Box>
          <Box sx={{ display: "flex", gap: "12px" }}>
            <TextField
              sx={{ height: "100%", width: "100%" }}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={onSendMessage}
              sx={{ height: "56px" }}
            >
              <SendOutlined />
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};
