// Match Strapi's expected response structure
export const heroData = {
  data: {
    attributes: {
      title: "Your Photographer Name",
      subtitle: "Capturing Timeless Moments",
      image: {
        data: {
          attributes: {
            url: "/placeholder-hero-desktop.jpg",
            alternativeText: "Photography hero image",
            formats: {
              small: { 
                url: "/placeholder-hero-mobile.jpg" 
              }
            }
          }
        }
      }
    }
  }
};