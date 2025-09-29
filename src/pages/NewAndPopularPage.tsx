import { Add, PlayArrow, ThumbUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { APP_BAR_HEIGHT } from "src/constant";
import { useGetVideosByMediaTypeAndCustomGenreQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { Movie } from "src/types/Movie";

const categories = [
  { name: "New Releases", apiString: "now_playing" },
  { name: "Trending Now", apiString: "popular" },
  { name: "Top Rated", apiString: "top_rated" },
  { name: "Upcoming", apiString: "upcoming" },
];

export default function NewAndPopularPage() {
  const [selectedCategory, setSelectedCategory] = useState("New Releases");
  const [mediaType, setMediaType] = useState<MEDIA_TYPE>(MEDIA_TYPE.Movie);

  const selectedCategoryConfig = categories.find(cat => cat.name === selectedCategory);

  // Fetch data for both movies and TV shows (excluding adult content)
  const { 
    data: moviesData, 
    isLoading: moviesLoading, 
    error: moviesError 
  } = useGetVideosByMediaTypeAndCustomGenreQuery({
    mediaType: MEDIA_TYPE.Movie,
    apiString: selectedCategoryConfig?.apiString || "popular",
    page: 1,
    includeAdult: false, // Explicitly exclude adult content
  });

  const { 
    data: tvData, 
    isLoading: tvLoading, 
    error: tvError 
  } = useGetVideosByMediaTypeAndCustomGenreQuery({
    mediaType: MEDIA_TYPE.Tv,
    apiString: selectedCategoryConfig?.apiString || "popular",
    page: 1,
    includeAdult: false, // Explicitly exclude adult content
  });

  const isLoading = moviesLoading || tvLoading;
  const hasError = moviesError || tvError;

  // Combine movies and TV shows data
  const currentContent = [
    ...(moviesData?.results || []),
    ...(tvData?.results || [])
  ].slice(0, 20);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

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
            New & Popular
          </Typography>
          <Typography variant="h6" sx={{ color: "#b3b3b3", mb: 3 }}>
            Discover the latest releases and trending content
          </Typography>
          
          {/* Category Filter */}
          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={category.name === selectedCategory ? "contained" : "outlined"}
                onClick={() => handleCategoryChange(category.name)}
                sx={{
                  backgroundColor: category.name === selectedCategory ? "#e50914" : "transparent",
                  borderColor: "#e50914",
                  color: "white",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: category.name === selectedCategory ? "#f40612" : "rgba(229, 9, 20, 0.1)",
                  },
                }}
              >
                {category.name}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" sx={{ color: "#b3b3b3", mb: 2 }}>
              Loading {selectedCategory.toLowerCase()} content...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {hasError && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" sx={{ color: "#e50914", mb: 2 }}>
              Error loading content
            </Typography>
            <Typography variant="body1" sx={{ color: "#b3b3b3" }}>
              Please try again later
            </Typography>
          </Box>
        )}

        {/* Content Grid */}
        {!isLoading && !hasError && (
          <Grid container spacing={3}>
            {currentContent.map((item: Movie, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                        image={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "https://via.placeholder.com/500x750/1a1a1a/ffffff?text=No+Image"
                        }
                        alt={item.title || item.original_title}
                        sx={{
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                      
                      {/* Status Badges */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        {selectedCategory === "New Releases" && (
                          <Chip
                            label="NEW"
                            size="small"
                            sx={{
                              backgroundColor: "#e50914",
                              color: "white",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                            }}
                          />
                        )}
                        {selectedCategory === "Trending Now" && (
                          <Chip
                            label="TRENDING"
                            size="small"
                            sx={{
                              backgroundColor: "#ff6b35",
                              color: "white",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                            }}
                          />
                        )}
                        {selectedCategory === "Top Rated" && (
                          <Chip
                            label="TOP RATED"
                            size="small"
                            sx={{
                              backgroundColor: "#ffd700",
                              color: "#000",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                            }}
                          />
                        )}
                        {selectedCategory === "Upcoming" && (
                          <Chip
                            label="COMING SOON"
                            size="small"
                            sx={{
                              backgroundColor: "#9c27b0",
                              color: "white",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                            }}
                          />
                        )}
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
                          <Add />
                        </IconButton>
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
                          <ThumbUp />
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
                        {item.title || item.original_title}
                      </Typography>
                      
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                          {item.release_date ? new Date(item.release_date).getFullYear() : "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                          •
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                          {item.original_language.toUpperCase()}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                          •
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#4caf50" }}>
                          Family Friendly
                        </Typography>
                      </Stack>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#b3b3b3",
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.overview || "No description available"}
                      </Typography>

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
                        Play
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!isLoading && !hasError && currentContent.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" sx={{ color: "#b3b3b3", mb: 2 }}>
              No content found
            </Typography>
            <Typography variant="body1" sx={{ color: "#b3b3b3" }}>
              Try selecting a different category
            </Typography>
          </Box>
        )}

        {/* Load More Section */}
        {!isLoading && !hasError && currentContent.length > 0 && (
          <Box sx={{ textAlign: "center", mt: 6, mb: 4 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#e50914",
                color: "#e50914",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#f40612",
                  color: "#f40612",
                  backgroundColor: "rgba(229, 9, 20, 0.1)",
                },
              }}
            >
              Load More
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
