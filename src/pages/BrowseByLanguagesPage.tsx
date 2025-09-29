import {
  Add,
  Language,
  PlayArrow,
  Public,
  Translate,
} from "@mui/icons-material";
import {
  Avatar,
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
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { APP_BAR_HEIGHT } from "src/constant";
import { useGetVideosByLanguageQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { Movie } from "src/types/Movie";

const languages = [
  { name: "English", flag: "🇺🇸", code: "en", count: 0 },
  { name: "Hindi", flag: "🇮🇳", code: "hi", count: 0 },
];

export default function BrowseByLanguagesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [mediaType, setMediaType] = useState<MEDIA_TYPE>(MEDIA_TYPE.Movie);

  const handleLanguageChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedLanguage(newValue);
  };

  const selectedLangConfig = languages.find(lang => lang.name === selectedLanguage);
  
  
  const { 
    data: moviesData, 
    isLoading: moviesLoading, 
    error: moviesError 
  } = useGetVideosByLanguageQuery({
    mediaType: MEDIA_TYPE.Movie,
    language: selectedLangConfig?.code || "en",
    page: 1,
    includeAdult: false, 
  });

  const { 
    data: tvData, 
    isLoading: tvLoading, 
    error: tvError 
  } = useGetVideosByLanguageQuery({
    mediaType: MEDIA_TYPE.Tv,
    language: selectedLangConfig?.code || "en",
    page: 1,
    includeAdult: false,
  });

  const isLoading = moviesLoading || tvLoading;
  const hasError = moviesError || tvError;


  const currentContent = [
    ...(moviesData?.results || []),
    ...(tvData?.results || [])
  ].slice(0, 20);

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
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Language sx={{ fontSize: 40, color: "#e50914" }} />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #e50914, #f40612)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Browse by Languages
            </Typography>
          </Stack>
          <Typography variant="h6" sx={{ color: "#b3b3b3", mb: 3 }}>
            Discover content from around the world in your preferred language
          </Typography>

          <Tabs
            value={selectedLanguage}
            onChange={handleLanguageChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 4,
              "& .MuiTabs-indicator": {
                backgroundColor: "#e50914",
              },
            }}
          >
            {languages.map((language) => (
              <Tab
                key={language.name}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ fontSize: "1.5rem" }}>
                      {language.flag}
                    </Typography>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {language.name}
                      </Typography>
                     
                    </Box>
                  </Stack>
                }
                value={language.name}
                sx={{
                  color: "#b3b3b3",
                  textTransform: "none",
                  minHeight: 60,
                  "&.Mui-selected": {
                    color: "#e50914",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Language Info Card */}
        <Card
          sx={{
            backgroundColor: "#1a1a1a",
            borderRadius: 2,
            p: 3,
            mb: 4,
            border: "1px solid rgba(229, 9, 20, 0.2)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                fontSize: "2rem",
                backgroundColor: "rgba(229, 9, 20, 0.1)",
              }}
            >
              {languages.find((lang) => lang.name === selectedLanguage)?.flag}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {selectedLanguage} Content
              </Typography>
              <Typography variant="body1" sx={{ color: "#b3b3b3" }}>
                Explore {(moviesData?.total_results || 0) + (tvData?.total_results || 0)} titles
                available in {selectedLanguage}. From blockbuster movies to binge-worthy series.
              </Typography>
            </Box>
            <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
              <Chip
                icon={<Public />}
                label="Global"
                sx={{
                  backgroundColor: "rgba(229, 9, 20, 0.2)",
                  color: "#e50914",
                  fontWeight: 600,
                }}
              />
              <Chip
                label="Family Safe"
                sx={{
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                  color: "#4caf50",
                  fontWeight: 600,
                }}
              />
            </Box>
          </Stack>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h5" sx={{ color: "#b3b3b3", mb: 2 }}>
              Loading {selectedLanguage} content...
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

                      {/* Language Badge */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                        }}
                      >
                        <Chip
                          icon={<Translate />}
                          label={selectedLanguage}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(229, 9, 20, 0.9)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                      </Box>

                      {/* Rating Badge */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <Chip
                          label={`${item.vote_average.toFixed(1)} ⭐`}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
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
              Try selecting a different language
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
              View All {selectedLanguage} Content
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
