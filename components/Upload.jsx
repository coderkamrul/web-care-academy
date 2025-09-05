"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import {
  X,
  Loader2,
  RefreshCw,
  Upload,
  ImageIcon,
  Video,
  Link2,
  CheckCircle2,
  AlertCircle,
  FileImage,
  FileVideo,
  Maximize2,
} from "lucide-react"

export default function FileUploadCard({ image, video, multiple = false, onUpload, maxSize = 10 }) {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [fileUrls, setFileUrls] = useState(multiple ? [] : null)
  const [previewModal, setPreviewModal] = useState({ open: false, file: null })
  const urlInput = useRef(null)

  useEffect(() => {
    console.log("[v0] File URLs updated:", fileUrls)
  }, [fileUrls])

  let acceptTypes = ""
  if (image && video) acceptTypes = "image/*,video/*"
  else if (image) acceptTypes = "image/*"
  else if (video) acceptTypes = "video/*"

  const handleFiles = (selectedFiles) => {
    if (!multiple && files.length > 0) {
      console.log("[v0] Cannot upload new file - remove existing file first")
      return
    }

    const fileList = Array.from(selectedFiles).map((file) => ({
      file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      progress: 0,
      url: null,
      uploading: true,
      error: null,
      isVideo: file.type.startsWith("video"),
      id: Math.random().toString(36).substr(2, 9),
    }))

    const oversizedFiles = fileList.filter((f) => Number.parseFloat(f.size) > maxSize)
    if (oversizedFiles.length > 0) {
      alert(`Files too large. Maximum size: ${maxSize}MB`)
      return
    }

    if (multiple) {
      setFiles((prev) => [...prev, ...fileList])
      fileList.forEach((f) => uploadFile(f))
    } else {
      setFiles(fileList)
      uploadFile(fileList[0])
    }
  }

  const uploadFile = useCallback(
    (fileObj) => {
      setIsUploading(true)
      const xhr = new XMLHttpRequest()
      const formData = new FormData()

      formData.append("file", fileObj.file)

      xhr.open("POST", "/api/upload")

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          setFiles((prev) => prev.map((f) => (f.id === fileObj.id ? { ...f, progress } : f)))
        }
      }

      xhr.onload = () => {
        setIsUploading(false)
        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText)
          setFiles((prev) => prev.map((f) => (f.id === fileObj.id ? { ...f, url: res.url, uploading: false } : f)))

          if (multiple) {
            setFileUrls((prev) => [...prev, res.url])
          } else {
            setFileUrls(res.url)
          }

          if (onUpload) onUpload(res.url)
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === fileObj.id ? { ...f, uploading: false, error: "Upload failed" } : f)),
          )
        }
      }

      xhr.onerror = () => {
        setIsUploading(false)
        setFiles((prev) =>
          prev.map((f) => (f.id === fileObj.id ? { ...f, uploading: false, error: "Network error" } : f)),
        )
      }

      xhr.send(formData)
    },
    [onUpload, multiple],
  )

  const handleRemove = (id) => {
    const fileToRemove = files.find((f) => f.id === id)
    setFiles((prev) => prev.filter((f) => f.id !== id))

    if (multiple) {
      setFileUrls((prev) => prev.filter((url) => url !== fileToRemove?.url))
    } else {
      setFileUrls(null)
    }
  }

  const handleRetry = (fileObj) => {
    setFiles((prev) => prev.map((f) => (f.id === fileObj.id ? { ...f, uploading: true, error: null, progress: 0 } : f)))
    uploadFile(fileObj)
  }

  const handleDirectLink = () => {
    const url = urlInput.current.value.trim()
    if (!url) return

    if (!multiple && files.length > 0) {
      console.log(" Cannot add direct link - remove existing file first")
      return
    }

    const fileObj = {
      id: Math.random().toString(36).substr(2, 9),
      name: "Direct Link",
      size: "-",
      url,
      uploading: false,
      error: null,
      isVideo: url.match(/\.(mp4|mov|avi|webm)$/i),
    }

    setFiles(multiple ? (prev) => [...prev, fileObj] : [fileObj])

    if (multiple) {
      setFileUrls((prev) => [...prev, url])
    } else {
      setFileUrls(url)
    }

    urlInput.current.value = ""
    if (onUpload) onUpload(url)
  }

  const openPreview = (file) => {
    setPreviewModal({ open: true, file })
  }

  const closePreview = () => {
    setPreviewModal({ open: false, file: null })
  }

  const getFileTypeIcon = (isVideo) => {
    return isVideo ? <FileVideo className="w-5 h-5" /> : <FileImage className="w-5 h-5" />
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {previewModal.open && previewModal.file && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center h-screen z-50 p-4" onClick={closePreview}>
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closePreview}
              className="absolute cursor-pointer top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors shadow-lg backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>
            {previewModal.file.isVideo ? (
              <video
                src={previewModal.file.url}
                controls
                className="w-full h-full max-h-[90vh] object-contain rounded-lg"
                autoPlay
              />
            ) : (
              <img
                src={previewModal.file.url || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-full max-h-[90vh] object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}

      <div className="relative">
        <div
          className={`relative w-full ${
            multiple ? "min-h-48" : "h-80"
          } border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ease-in-out group
          ${
            dragActive
              ? "border-primary bg-primary/5 scale-[1.02] shadow-lg"
              : "border-border bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
          }`}
          onClick={() => {
            if (!multiple && files.length > 0) return
            document.getElementById("fileInput").click()
          }}
          onDragOver={(e) => {
            e.preventDefault()
            if (!multiple && files.length > 0) return
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragActive(false)
            if (!multiple && files.length > 0) return
            handleFiles(e.dataTransfer.files)
          }}
        >
          {!multiple && files[0] ? (
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-muted">
              {files[0].uploading ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-muted">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-primary w-12 h-12" />
                    <div className="text-center space-y-2">
                      <p className="text-lg font-medium text-foreground">Uploading...</p>
                      <p className="text-sm text-muted-foreground">{files[0].name}</p>
                      <div className="w-48 bg-muted-foreground/20 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${files[0].progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{files[0].progress}%</p>
                    </div>
                  </div>
                </div>
              ) : files[0].error ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-destructive/5">
                  <div className="flex flex-col items-center gap-4">
                    <AlertCircle className="w-12 h-12 text-destructive" />
                    <div className="text-center space-y-2">
                      <p className="text-lg font-medium text-destructive">Upload Failed</p>
                      <p className="text-sm text-muted-foreground">{files[0].error}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRetry(files[0])
                        }}
                        className="px-4 cursor-pointer py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              ) : files[0].url ? (
                <>
                  <div
                    className="w-full h-full cursor-pointer group/preview relative"
                    onClick={(e) => {
                      e.stopPropagation()
                      openPreview(files[0])
                    }}
                  >
                    {files[0].isVideo ? (
                      <video src={files[0].url} className="w-full h-full object-cover" />
                    ) : (
                      <img
                        src={files[0].url || "/placeholder.svg"}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover/preview:bg-black/20 transition-colors flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover/preview:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemove(files[0].id)
                      }}
                      className="p-2 cursor-pointer bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors shadow-lg backdrop-blur-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <div className="text-center space-y-4 p-8">
              <div className="flex justify-center">
                <div
                  className={`p-4 rounded-full transition-colors ${
                    dragActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  }`}
                >
                  <Upload className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Drop your {image && video ? "files" : image ? "images" : "videos"} here
                </h3>
                <p className="text-muted-foreground">or click to browse from your device</p>
                <p className="text-sm text-muted-foreground">Maximum file size: {maxSize}MB</p>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                {image && (
                  <div className="flex items-center gap-1">
                    <ImageIcon className="w-4 h-4" />
                    <span>Images</span>
                  </div>
                )}
                {video && (
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    <span>Videos</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <input
            type="file"
            multiple={multiple}
            accept={acceptTypes}
            id="fileInput"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-card rounded-xl border">
        <Link2 className="w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          ref={urlInput}
          placeholder="Or paste a direct link to your file..."
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
        />
        <button
          onClick={handleDirectLink}
          className="px-4 cursor-pointer py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Add Link
        </button>
      </div>

      {multiple && files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Uploaded Files</h3>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className={`flex items-center gap-4 p-4 bg-card border rounded-xl transition-all duration-200 ${
                  file.error
                    ? "border-destructive bg-destructive/5"
                    : file.uploading
                      ? "border-primary bg-primary/5"
                      : "border-border hover:shadow-md"
                }`}
              >
                <div
                  className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => file.url && !file.uploading && !file.error && openPreview(file)}
                >
                  {file.uploading ? (
                    <Loader2 className="animate-spin text-primary w-5 h-5" />
                  ) : file.error ? (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  ) : file.url ? (
                    file.isVideo ? (
                      <video src={file.url} className="w-full h-full object-cover" />
                    ) : (
                      <img src={file.url || "/placeholder.svg"} alt="preview" className="w-full h-full object-cover" />
                    )
                  ) : (
                    <div className="text-muted-foreground">{getFileTypeIcon(file.isVideo)}</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground text-sm truncate">{file.name}</h4>
                    {!file.uploading && !file.error && file.url && (
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                    {file.uploading && (
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex-1 bg-muted rounded-full h-1.5 max-w-32">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground min-w-0">{file.progress}%</span>
                      </div>
                    )}
                  </div>
                  {file.error && <p className="text-xs text-destructive mt-1">{file.error}</p>}
                </div>

                <div className="flex gap-1 flex-shrink-0">
                  {file.error && (
                    <button
                      onClick={() => handleRetry(file)}
                      className="p-2 cursor-pointer bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      title="Retry upload"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(file.id)}
                    className="p-2 cursor-pointer bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-foreground font-medium">
              {files.filter((f) => f.url && !f.error).length} of {files.length} files uploaded
            </span>
            {isUploading && <Loader2 className="animate-spin w-4 h-4 text-primary" />}
          </div>

          {files.some((f) => f.url && !f.error) && (
            <button
              onClick={() => {
                const successfulFiles = files.filter((f) => f.url && !f.error)
                console.log("Save to database:", successfulFiles)
                console.log("Current file URLs:", fileUrls)
              }}
              className="px-4 cursor-pointer py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Save to Database
            </button>
          )}
        </div>
      )}
    </div>
  )
}
