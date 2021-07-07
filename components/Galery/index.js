import ImageGallery from 'react-image-gallery'

const Galery = ({ images }) => {
  const imagesFormat = images.map(image => ({
    original: image,
    originalHeight: '100%',
    originalWidth: '100%',
  }))

  return (
    <ImageGallery
      additionalClass={'galeryContainer'}
      showThumbnails={false}
      showBullets={true}
      items={imagesFormat}
      stopPropagation={true}
    />
  )
}

export default Galery
