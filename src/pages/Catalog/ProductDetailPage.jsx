import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../services/productsService';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

function ProductDetailPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Error loading product detail");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '40px auto', 
      padding: '0 24px',
      fontFamily: 'system-ui, -apple-system, sans-serif' /* Forces clean font */
    }}>
      
      {/* Back Navigation */}
      <Link to="/" style={{ 
        display: 'inline-block', 
        marginBottom: '24px', 
        color: '#333333', 
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1rem'
      }}>
        ← Back to Catalog
      </Link>

      {/* Main Product Container */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', /* Allows stacking on small mobile screens */
        gap: '40px', 
        backgroundColor: '#FFFFFF', 
        padding: '32px', 
        borderRadius: '12px', 
        border: '1px solid #DDDDDD',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        
        {/* Left Side: Image */}
        <div style={{ flex: '1 1 400px' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '8px',
              objectFit: 'cover',
              border: '1px solid #F5F5F5'
            }} 
          />
        </div>

        {/* Right Side: Product Info */}
        <div style={{ 
          flex: '1 1 300px', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', /* Vertically centers the text block */
          textAlign: 'left' /* Fixes the ugly centered text */
        }}>
          
          <p style={{ color: '#777777', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '8px', marginTop: 0 }}>
            {product.category}
          </p>
          
          <h1 style={{ color: '#333333', fontSize: '2.5rem', marginTop: '0', marginBottom: '16px', lineHeight: '1.2' }}>
            {product.name}
          </h1>
          
          <h2 style={{ color: '#000000', fontSize: '2rem', marginTop: '0', marginBottom: '24px' }}>
            ${product.price.toFixed(2)}
          </h2>
          
          <p style={{ color: '#555555', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '32px' }}>
            {product.description}
          </p>
          
          <div style={{ marginTop: 'auto' }}>
            <p style={{ 
              color: product.stock > 0 ? '#28a745' : '#FF0000', /* Green if in stock, Red if not */
              fontWeight: 'bold', 
              marginBottom: '16px' 
            }}>
              {product.stock > 0 ? `In Stock: ${product.stock} units available` : 'Out of Stock'}
            </p>
            
            <button 
              onClick={() => console.log("Added to cart", product)}
              style={{ 
                width: '100%', 
                padding: '16px', 
                backgroundColor: '#333333', 
                color: '#FFFFFF', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '1.1rem', 
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#000000'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#333333'}
            >
              Add to Cart
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;