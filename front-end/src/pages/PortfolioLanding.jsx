// src/pages/PortfolioLanding.jsx

import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Weddings & Elopements",
    description: "Your love story, beautifully captured.",
    slug: "weddings-elopements",
    imageUrl: "/images/stock_wedding_photo.avif", // Ensure these paths are correct
    ariaLabel: "View Wedding and Elopement Photography Portfolio"
  },
  {
    title: "Family Portraits",
    description: "Couples, Families, and Maternity",
    slug: "couples",
    imageUrl: "/images/stock_couples_photo.avif", // Ensure these paths are correct
    ariaLabel: "View Couples Photography Portfolio"
  },
  {
    title: "College Graduates",
    description: "Celebrate your milestone achievement.",
    slug: "college-graduates",
    imageUrl: "/images/stock_college_grad_photo.avif", // Ensure these paths are correct
    ariaLabel: "View College Graduates Photography Portfolio"
  },
];

export default function PortfolioLanding() {
  return (
    <div className="container mx-auto py-12 px-4 pt-[90px] text-center">
      <h1 className="text-4xl md:text-5xl font-display mb-6 p-2 text-brand-dark">
        Portfolio
      </h1>

      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac facilisis justo.
        Sed sollicitudin, sapien et hendrerit tincidunt, magna ligula cursus mi, ut gravida quam mi vitae mi.
        Phasellus semper turpis ut condimentum tristique. Nulla nec cursus enim, in feugiat lorem.
      </p>

      {/* Changed grid to always be 1 column, removing md:grid-cols-3 */}
      <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/portfolio/${category.slug}`}
            aria-label={category.ariaLabel}
            // The Link now acts as a container for image + text block
            // Removed 'group' from Link as it's not the primary hover target for scale
            className="block w-full rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Image container: Set aspect ratio here */}
            <div className="relative w-full aspect-video overflow-hidden group"> {/* Added 'group' here for img hover */}
              <img
                src={category.imageUrl}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // Image scales on hover of its parent 'group' div
              />
            </div>
            {/* Text content BELOW the image */}
            <div className="p-6 text-center bg-transparent text-brand-dark">
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-2">
                {category.title}
              </h2>
              <p className="text-sm md:text-base">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}