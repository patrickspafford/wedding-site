import React, { useEffect, useState, useRef, ChangeEvent } from "react"
import { useContext } from "react"
import Image from "next/image"
import { ApiContext } from "../contexts"
import LoadingIndicator from "../components/LoadingIndicator"
import Authenticated from "../components/Authenticated"

interface IPagination {
  pageTokens: string[]
  currIdx: undefined | number | null
}

const Photos = () => {
  const { apiService } = useContext(ApiContext)
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [shouldLoadPhotos, setShouldLoadPhotos] = useState(true)
  const [pagination, setPagination] = useState<IPagination>({
    pageTokens: [],
    currIdx: null,
    isNextPage: false,
  })

  const loadPhotos = async (first: boolean) => {
    try {
      setLoading(true)
      const urls: string[] = []
      const config = first
        ? {
            maxResults: 3,
          }
        : {
            maxResults: 3,
            pageToken:
              pagination.pageTokens.length !== 0
                ? pagination.pageTokens[pagination.currIdx ?? 0]
                : undefined,
          }
      const allPhotos = await apiService.sharedPhotosRef().list({ ...config })
      if (allPhotos.nextPageToken) {
        setPagination({
          ...pagination,
          pageTokens: [...pagination.pageTokens, allPhotos.nextPageToken],
        })
      }
      for await (const item of allPhotos.items) {
        const url = await item.getDownloadURL()
        urls.push(url as string)
      }
      setImages(urls)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setShouldLoadPhotos(false)
    }
  }

  const handleSetImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      const files = Array.from(e.target.files || [])
      for await (const file of files) {
        await apiService.uploadSharedPhoto(file)
      }
      setShouldLoadPhotos(true)
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    if (shouldLoadPhotos) {
      loadPhotos(pagination.pageTokens.length === 0)
    }
  }, [shouldLoadPhotos, pagination.pageTokens, pagination.currIdx])

  const handleNextPage = () => {
    set
  }

  const handlePrevPage = () => {}

  return (
    <Authenticated>
      <div className="flex justify-center p-8">
        <form>
          <input
            id="file-submit"
            type="file"
            required
            multiple
            onChange={handleSetImage}
            accept="image/jpeg, image/png, image/jpg, image/heic"
            hidden
          />
          <label
            htmlFor="file-submit"
            className="text-charcoal bg-white p-4 rounded-md hover:opacity-50 cursor-pointer"
          >
            Upload A Photo
          </label>
        </form>
      </div>
      <div className="bg-white p-4 flex items-center justify-center flex-wrap">
        {loading ? (
          <LoadingIndicator />
        ) : (
          images.map((imgSrc) => (
            <div className="inline-block mr-2 ml-2" key={imgSrc}>
              <Image
                key={imgSrc}
                src={imgSrc}
                height={250}
                width={250}
                placeholder="blur"
                quality={50}
                objectFit="cover"
                blurDataURL={imgSrc}
                alt="Of Wedding, Shared"
              />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between items-center p-8">
        <button
          onClick={handlePrevPage}
          className="text-charcoal bg-white pl-8 pr-8 p-4 rounded-md hover:opacity-50"
        >
          {`<<`} Prev
        </button>
        <button
          onClick={handleNextPage}
          className="text-charcoal bg-white pl-8 pr-8 p-4 rounded-md hover:opacity-50"
        >
          Next {`>>`}
        </button>
      </div>
    </Authenticated>
  )
}

export default Photos
