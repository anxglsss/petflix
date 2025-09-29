import {
  Add,
  Delete,
  Edit,
  FilterList,
  PlayArrow,
  Search,
  Sort,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { APP_BAR_HEIGHT } from "src/constant";

// Mock data for user's list
const initialMyList = [
  {
    id: 1,
    title: "The Queen's Gambit",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=600&fit=crop",
    year: "2020",
    duration: "7 Episodes",
    rating: "TV-MA",
    genre: "Drama",
    addedDate: "2023-01-15",
    progress: 75,
  },
  {
    id: 2,
    title: "Money Heist",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=600&fit=crop",
    year: "2017-2021",
    duration: "5 Seasons",
    rating: "TV-MA",
    genre: "Crime",
    addedDate: "2023-02-03",
    progress: 100,
  },
  {
    id: 3,
    title: "Dark",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=600&fit=crop",
    year: "2017-2020",
    duration: "3 Seasons",
    rating: "TV-MA",
    genre: "Sci-Fi",
    addedDate: "2023-01-28",
    progress: 60,
  },
  {
    id: 4,
    title: "The Witcher",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=600&fit=crop",
    year: "2019-",
    duration: "3 Seasons",
    rating: "TV-MA",
    genre: "Fantasy",
    addedDate: "2023-03-10",
    progress: 40,
  },
  {
    id: 5,
    title: "Stranger Things",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=600&fit=crop",
    year: "2016-",
    duration: "4 Seasons",
    rating: "TV-14",
    genre: "Sci-Fi",
    addedDate: "2023-02-15",
    progress: 90,
  },
  {
    id: 6,
    title: "Bridgerton",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=600&fit=crop",
    year: "2020-",
    duration: "2 Seasons",
    rating: "TV-MA",
    genre: "Romance",
    addedDate: "2023-01-20",
    progress: 100,
  },
];

const sortOptions = ["Recently Added", "A-Z", "Z-A", "Release Date", "Progress"];

export default function MyListPage() {
  const [myList, setMyList] = useState(initialMyList);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Recently Added");
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: any }>({
    open: false,
    item: null,
  });

  const handleDelete = (item: any) => {
    setMyList(myList.filter((listItem) => listItem.id !== item.id));
    setDeleteDialog({ open: false, item: null });
  };

  const filteredList = myList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#141414",
        color: "white",
        pt: `${APP_BAR_HEIGHT + 16}px`, // Add navbar height + some padding
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(45deg, #e50914, #f40612)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My List
          </Typography>
          <Typography variant="h6" sx={{ color: "#b3b3b3", mb: 3 }}>
            {myList.length} titles in your list
          </Typography>

          {/* Search and Filter Bar */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ mb: 4 }}
          >
            <TextField
              placeholder="Search your list..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: "#b3b3b3", mr: 1 }} />,
              }}
              sx={{
                flexGrow: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e50914",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                  "&::placeholder": {
                    color: "#b3b3b3",
                  },
                },
              }}
            />
            <Button
              startIcon={<FilterList />}
              variant="outlined"
              sx={{
                borderColor: "#e50914",
                color: "#e50914",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#f40612",
                  color: "#f40612",
                  backgroundColor: "rgba(229, 9, 20, 0.1)",
                },
              }}
            >
              Filter
            </Button>
            <Button
              startIcon={<Sort />}
              variant="outlined"
              sx={{
                borderColor: "#e50914",
                color: "#e50914",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#f40612",
                  color: "#f40612",
                  backgroundColor: "rgba(229, 9, 20, 0.1)",
                },
              }}
            >
              {sortBy}
            </Button>
          </Stack>
        </Box>

        {/* Content Grid */}
        <AnimatePresence>
          <Grid container spacing={3}>
            {filteredList.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      backgroundColor: "#1a1a1a",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(229, 9, 20, 0.3)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={item.image}
                        alt={item.title}
                        sx={{
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />

                      {/* Progress Bar */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            width: `${item.progress}%`,
                            backgroundColor: "#e50914",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </Box>

                      {/* Action Buttons */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.9)",
                            },
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            setDeleteDialog({ open: true, item })
                          }
                          sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "rgba(244, 67, 54, 0.8)",
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: "white",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                          {item.year}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                          •
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                          {item.duration}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                          •
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                          {item.rating}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip
                          label={item.genre}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(229, 9, 20, 0.2)",
                            color: "#e50914",
                            fontSize: "0.7rem",
                          }}
                        />
                        <Chip
                          label={`${item.progress}% watched`}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(76, 175, 80, 0.2)",
                            color: "#4caf50",
                            fontSize: "0.7rem",
                          }}
                        />
                      </Stack>

                      <Button
                        startIcon={<PlayArrow />}
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: "#e50914",
                          color: "white",
                          textTransform: "none",
                          fontWeight: 600,
                          py: 1,
                          "&:hover": {
                            backgroundColor: "#f40612",
                          },
                        }}
                      >
                        {item.progress === 100 ? "Watch Again" : "Continue"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>

        {/* Empty State */}
        {filteredList.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              color: "#b3b3b3",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              {searchTerm ? "No results found" : "Your list is empty"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start adding movies and shows to your list"}
            </Typography>
            <Button
              startIcon={<Add />}
              variant="contained"
              sx={{
                backgroundColor: "#e50914",
                color: "white",
                textTransform: "none",
                px: 3,
                "&:hover": {
                  backgroundColor: "#f40612",
                },
              }}
            >
              Browse Content
            </Button>
          </Box>
        )}
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, item: null })}
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            color: "white",
          },
        }}
      >
        <DialogTitle>Remove from List</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove "{deleteDialog.item?.title}" from
            your list?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, item: null })}
            sx={{ color: "#b3b3b3" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteDialog.item)}
            sx={{ color: "#e50914" }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
