import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Rating,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Visibility,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  badge?: string;
}

const products: Product[] = [
  { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: 299.99, originalPrice: 349.99, rating: 4.8, reviews: 1234, stock: 45, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', badge: 'Best Seller' },
  { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: 449.99, rating: 4.6, reviews: 892, stock: 23, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', badge: 'New' },
  { id: 3, name: 'Ergonomic Office Chair', category: 'Furniture', price: 599.99, originalPrice: 699.99, rating: 4.9, reviews: 567, stock: 12, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300' },
  { id: 4, name: 'Mechanical Gaming Keyboard', category: 'Electronics', price: 179.99, rating: 4.7, reviews: 2341, stock: 78, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300', badge: 'Popular' },
  { id: 5, name: 'Minimalist Desk Lamp', category: 'Home', price: 89.99, rating: 4.5, reviews: 432, stock: 156, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300' },
  { id: 6, name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 129.99, originalPrice: 159.99, rating: 4.4, reviews: 876, stock: 34, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300' },
  { id: 7, name: 'Leather Laptop Bag', category: 'Accessories', price: 199.99, rating: 4.8, reviews: 654, stock: 28, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', badge: 'Premium' },
  { id: 8, name: 'Wireless Charging Pad', category: 'Electronics', price: 49.99, rating: 4.3, reviews: 1567, stock: 234, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=300' },
];

const Products: React.FC = () => {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDarkMode } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
      case 'New':
        return 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
      case 'Popular':
        return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
      case 'Premium':
        return 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)';
      default:
        return 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)';
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardStyle = {
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}>
              Products
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your product inventory
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            fullWidth={isCompact}
            sx={{
              maxWidth: { xs: '100%', sm: 'fit-content' },
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
            }}
          >
            Add Product
          </Button>
        </Box>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card sx={{ ...cardStyle, mb: 4 }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search products..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flex: 1, minWidth: { xs: 0, sm: 240 }, width: { xs: '100%', sm: 'auto' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                fullWidth={isCompact}
                sx={{ borderColor: isDarkMode ? 'rgba(129,140,248,0.3)' : 'rgba(99,102,241,0.3)' }}
              >
                Filters
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card
                sx={{
                  ...cardStyle,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: isDarkMode
                      ? '0 20px 40px rgba(129,140,248,0.2)'
                      : '0 20px 40px rgba(99,102,241,0.15)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height={isCompact ? '180' : '200'}
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  {product.badge && (
                    <Chip
                      label={product.badge}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: getBadgeColor(product.badge),
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}
                    />
                  )}
                  <IconButton
                    onClick={() => toggleFavorite(product.id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
                      '&:hover': {
                        bgcolor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,1)',
                      },
                    }}
                  >
                    {favorites.includes(product.id) ? (
                      <Favorite sx={{ color: '#ef4444' }} />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </Box>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                  <Typography variant="caption" color="text.secondary" gutterBottom>
                    {product.category}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ lineHeight: 1.3 }}>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Rating value={product.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="caption" color="text.secondary">
                      ({product.reviews})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography variant="h6" fontWeight={700} color="primary">
                      ${product.price}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ${product.originalPrice}
                      </Typography>
                    )}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: product.stock > 50 ? 'success.main' : product.stock > 20 ? 'warning.main' : 'error.main',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {product.stock > 50 ? 'In Stock' : product.stock > 20 ? 'Low Stock' : 'Limited Stock'} ({product.stock})
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCart />}
                      sx={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                      }}
                    >
                      Add
                    </Button>
                    <IconButton
                      size="small"
                      sx={{
                        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.3)' : 'rgba(99,102,241,0.3)'}`,
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
