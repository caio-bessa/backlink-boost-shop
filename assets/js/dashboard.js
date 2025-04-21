
/**
 * Dashboard JavaScript for BacklinkBoost
 */

(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile sidebar
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);
    
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        document.body.classList.toggle('sidebar-open');
        sidebarOverlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
      });
      
      sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
        sidebarOverlay.style.display = 'none';
      });
    }
    
    // Toggle dropdown menus in sidebar
    const menuLinks = document.querySelectorAll('.has-dropdown');
    
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        
        const parent = link.parentElement;
        const subMenu = parent.querySelector('.sidebar-submenu');
        
        if (parent.classList.contains('active')) {
          parent.classList.remove('active');
          subMenu.style.maxHeight = null;
        } else {
          // Close all other open submenus
          document.querySelectorAll('.sidebar-menu-item.active').forEach(function(item) {
            if (item !== parent) {
              item.classList.remove('active');
              item.querySelector('.sidebar-submenu').style.maxHeight = null;
            }
          });
          
          parent.classList.add('active');
          subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
        }
      });
    });
  });
  
  // WooCommerce cart slide-in functionality
  const setupCartSlideIn = function() {
    const cartToggle = document.querySelector('.cart-toggle');
    const cartSlideIn = document.querySelector('#cart-slidein');
    const cartOverlay = document.querySelector('.cart-slidein-overlay');
    const closeCart = document.querySelector('.close-cart');
    
    if (cartToggle && cartSlideIn) {
      cartToggle.addEventListener('click', function(event) {
        event.preventDefault();
        cartSlideIn.classList.add('open');
        cartOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
      
      if (closeCart) {
        closeCart.addEventListener('click', function() {
          cartSlideIn.classList.remove('open');
          cartOverlay.style.display = 'none';
          document.body.style.overflow = '';
        });
      }
      
      if (cartOverlay) {
        cartOverlay.addEventListener('click', function() {
          cartSlideIn.classList.remove('open');
          cartOverlay.style.display = 'none';
          document.body.style.overflow = '';
        });
      }
    }
  };
  
  // Google OAuth integration (simplified for demonstration)
  const setupGoogleAuth = function() {
    const connectButton = document.getElementById('connect-google-button');
    
    if (connectButton) {
      connectButton.addEventListener('click', function() {
        // This is a simplified version. In a real implementation, you would use Google's OAuth 2.0 flow
        console.log('Starting Google OAuth flow...');
        
        // Simulate a successful connection
        setTimeout(function() {
          console.log('Google accounts connected successfully!');
          // Redirect to refresh the page
          window.location.reload();
        }, 1500);
      });
    }
  };
  
  // Initialize all components
  document.addEventListener('DOMContentLoaded', function() {
    setupCartSlideIn();
    setupGoogleAuth();
  });
})();
