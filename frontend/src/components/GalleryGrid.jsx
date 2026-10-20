/**
 * GALLERY GRID
 *
 * Step 1: When page loads, call getGalleryItems() (AJAX to Laravel)
 * Step 2: Save photos in state
 * Step 3: Show photos in a grid — filter buttons at top
 *
 * Edit photos in admin: http://localhost:8000/admin/gallery
 */
import { useEffect, useState } from 'react';
import { getGalleryItems } from '../api/content';

export default function GalleryGrid() {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('All');

  // Load photos from database when component mounts
  useEffect(() => {
    async function loadPhotos() {
      try {
        const data = await getGalleryItems();
        setPhotos(data);
      } catch {
        setPhotos([]);
      }
    }
    loadPhotos();
  }, []);

  // Build category list from photos (simple loop, no useMemo)
  const categories = [];
  for (const photo of photos) {
    if (photo.category && !categories.includes(photo.category)) {
      categories.push(photo.category);
    }
  }

  // Filter photos by selected category
  let shown = photos;
  if (filter !== 'All') {
    shown = photos.filter((p) => p.category === filter);
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setFilter('All')}
          className={`gallery-filter-btn ${filter === 'All' ? 'gallery-filter-btn-active' : ''}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`gallery-filter-btn ${filter === cat ? 'gallery-filter-btn-active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-masonry mt-12">
        {shown.length === 0 ? (
          <p className="col-span-full py-12 text-center text-espresso/50">
            No gallery photos yet. Add them in the admin panel.
          </p>
        ) : (
          shown.map((photo) => (
            <div key={photo.id} className={`gallery-masonry-item gallery-masonry-${photo.size || 'medium'}`}>
              <div className={`gallery-tile gallery-tile-${photo.size || 'medium'} group`}>
                <img src={photo.image} alt={photo.title} className="gallery-tile-image" loading="lazy" />
                <div className="gallery-tile-overlay" />
                <div className="gallery-tile-caption">
                  <span className="gallery-tile-category">{photo.category}</span>
                  <p className="gallery-tile-title">{photo.title}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
