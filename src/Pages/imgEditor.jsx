import React, { useState } from 'react';
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

function ImageEditor() {
  // State to hold the selected images
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true); // State for sidebar visibility

  // Handle file selection
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages(uploadedImages);
  };

  // Handle selecting an image to edit
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      {sidebarVisible && (
        <div
          style={{
            width: '20%',
            padding: '20px',
            borderRight: '2px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            position: 'relative',
          }}
        >
          <button
            onClick={toggleSidebar}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: '#333',
              cursor: 'pointer',
              padding: '5px',
              transition: 'transform 0.2s ease',
            }}
          >
            X
          </button>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#333' }}>Upload Images</h3>

          {/* File upload button with "+" sign */}
          <label
            htmlFor="image-upload"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              border: '2px solid #ddd',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              fontSize: '30px',
              color: '#333',
              marginBottom: '20px',
              transition: 'transform 0.2s ease',
            }}
          >
            +
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </label>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#333' }}>Preview</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '10px',
                  width: '100%',
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  borderRadius: '5px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={image}
                  alt={`uploaded-${index}`}
                  width="100%"
                  style={{
                    borderRadius: '5px',
                    transition: 'transform 0.2s ease',
                  }}
                  onClick={() => handleImageSelect(image)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Editor */}
      <div style={{ width: sidebarVisible ? '80%' : '100%', padding: '20px' }}>
        {selectedImage ? (
          <FilerobotImageEditor
            source={selectedImage}
            onSave={(editedImageObject, designState) =>
              console.log('saved', editedImageObject, designState)
            }
            annotationsCommon={{
              fill: '#ff0000',
            }}
            Text={{ text: 'Write something here...' }}
            Rotate={{ angle: 90, componentType: 'buttons' }}
            tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.FILTERS, TABS.FINETUNE]}
            defaultTabId={TABS.ANNOTATE}
            defaultToolId={TOOLS.TEXT}
          />
        ) : (
          <p style={{ fontSize: '1.2rem', color: '#555' }}>Please select an image to edit</p>
        )}
      </div>
    </div>
  );
}

export default ImageEditor;



// import React, { useState } from 'react';
// import FilerobotImageEditor, {
//   TABS,
//   TOOLS,
// } from 'react-filerobot-image-editor';

// function ImageEditor() {
//   return (
//     <div>
//       <FilerobotImageEditor
//         source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
//         onSave={(editedImageObject, designState) =>
//           console.log('saved', editedImageObject, designState)
//         }
//         annotationsCommon={{
//           fill: '#ff0000',
//         }}
//         Text={{ text: 'Write something here...' }}
//         Rotate={{ angle: 90, componentType: 'buttons' }}
//         tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.FILTERS,TABS.FINETUNE]}
//         defaultTabId={TABS.ANNOTATE}
//         defaultToolId={TOOLS.TEXT}
//       />
//     </div>
//   );
// }

// export default ImageEditor;
