import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

function ComplaintAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `👋 Welcome!

I'm your AI Complaint Assistant.

I can help you:

- Analyze customer complaints
- Identify complaint trends
- Find high-risk complaints
- Answer questions about complaint data

How can I help you today?`,
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/assistant/",
        {
          question: currentQuestion,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "❌ Unable to connect to the AI Assistant.\n\nPlease make sure the FastAPI backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    "How many complaints are there?",
    "Show all High Risk complaints",
    "Show Billing complaints",
    "Which category has the highest number of complaints?",
    "Summarize all complaints",
  ];

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        AI Complaint Assistant
      </Typography>

      <Paper
        elevation={3}
        sx={{
          maxWidth: 900,
          mx: "auto",
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
        }}
      >
        {/* Messages */}

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
          }}
        >
          <Stack spacing={3}>
            {messages.map((msg, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                justifyContent={
                  msg.sender === "user"
                    ? "flex-end"
                    : "flex-start"
                }
              >
                {msg.sender === "bot" && (
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <SmartToyIcon />
                  </Avatar>
                )}

                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: "70%",
                    borderRadius: 3,
                    overflowX: "auto",
                    bgcolor:
                      msg.sender === "user"
                        ? "primary.main"
                        : "background.paper",
                    color:
                      msg.sender === "user"
                        ? "#fff"
                        : "#000",

                    "& p": {
                      margin: "8px 0",
                    },

                    "& ul,& ol": {
                      paddingLeft: "20px",
                    },

                    "& table": {
                      width: "100%",
                      minWidth: "600px",
                      borderCollapse: "collapse",
                    },

                    "& th,& td": {
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                    },

                    "& th": {
                      backgroundColor: "#1976d2",
                      color: "#fff",
                    },

                    "& code": {
                      backgroundColor: "#eeeeee",
                      padding: "2px 4px",
                      borderRadius: "4px",
                    },

                    "& pre": {
                      backgroundColor: "#f5f5f5",
                      padding: "10px",
                      borderRadius: "6px",
                      overflowX: "auto",
                    },
                  }}
                >
                  {msg.sender === "user" ? (
                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                      {msg.text}
                    </Typography>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  )}
                </Paper>

                {msg.sender === "user" && (
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <PersonIcon />
                  </Avatar>
                )}
              </Stack>
            ))}

            {loading && (
              <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <SmartToyIcon />
                </Avatar>

                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <CircularProgress size={20} />
                  <Typography>AI is thinking...</Typography>
                </Paper>
              </Stack>
            )}

            <div ref={messagesEndRef} />
          </Stack>
        </Box>

        {/* Suggested Questions */}

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderTop: "1px solid #ddd",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Typography variant="subtitle2" mb={1}>
            Suggested Questions
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
          >
            {suggestedQuestions.map((item) => (
              <Button
                key={item}
                size="small"
                variant="outlined"
                onClick={() => setQuestion(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
        </Paper>

        {/* Input */}

        <Box
          sx={{
            p: 2,
          }}
        >
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              placeholder="Ask about complaints, trends, priorities..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <Button
              variant="contained"
              onClick={handleSend}
              disabled={loading || !question.trim()}
            >
              Ask AI
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default ComplaintAssistant;