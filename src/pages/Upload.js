import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Button, Modal, ModalHeader, FormGroup, Input, FormText } from 'reactstrap'
import { toast } from 'react-toastify'


const Upload = ({ uploadModal, uploadToggle }) => {
    const [imageFile, setImageFile] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const [previewImage, setPreviewImage] = useState(null)



    const history = useHistory()

    const handleFile = (e) => {
        setImageFile(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }

    const isDisabled = () => {
        if (imageFile) {
            return false
        } else {
            return true
        }
    }

    const upload = (e) => {
        e.preventDefault()
        const jwt = localStorage.getItem('jwt')
        const formData = new FormData()
        formData.append("image", imageFile)

        axios.post('https://insta.nextacademy.com/api/v1/images/', formData,
            { headers: { 'Authorization': `Bearer ${jwt}` } },
        )
            .then(response => {
                setIsLoading(false)
                console.log(response.data)
                history.push('/profile')
                uploadToggle()
                toast.success(`Uploaded image successfully`, {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
            .catch(error => {
                setIsLoading(false)
                console.log('Error', error)
                toast.error(`Woops, that didn't work`, {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,

                })
            })
    }


return (
    <>
        <Modal isOpen={uploadModal}>
            <ModalHeader toggle={uploadToggle}>
                Photo Upload
</ModalHeader>
            <FormGroup>
                <Input
                    type="file"
                    multiple="false"
                    onChange={handleFile}
                />
                <FormText color="muted">
                    Upload either a jpeg or a png
                            </FormText>
            </FormGroup>
            <div className="card">
                {previewImage ? (
                    <img
                        src={previewImage}
                        alt="preview"
                        width="50%"
                        height="50%"
                    />
                ) : (
                        null
                    )}
            </div>
            <Button
                type="submit"
                color="primary"
                disabled={isDisabled()}
                onClick={upload}>
                Upload
  </Button>
        </Modal>

    </>
)
                }

export default Upload