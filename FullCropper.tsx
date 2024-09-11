const FullCropper: React.FC = () => {
  const [showCropper, setShowCropper] = useState<boolean>(false)
  const [cropImageUrl, setCropImageUrl] = useState<null | string>()
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setShowCropper(true)
        setCropImageUrl(reader?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <>
      {showCropper && cropImageUrl && (
        <CropModal
          children={
            <CroppedImage
              setShowModal={setShowCropper}
              selectedImage={cropImageUrl}
              onSave={handleCroppedImage}
            />
          }
        />
      )}
    </>
  )
}
export default FullCropper
