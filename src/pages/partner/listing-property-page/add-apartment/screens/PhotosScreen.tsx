import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ThumbsUp, Upload, X } from "lucide-react";
import HelpCard from "./HelpCard";
import type { RefObject } from "react";
import type { PhotoItem } from "@/types/request/apartment/addApartmentRequest.types";
import { useAppSelector } from "@/store/hooks";
import { selectAddApartmentErrors } from "@/store/partner/manage-property/apartment/apartment.selector";
import { StepErrorBanner } from "@/components/error-baners/StepErrorBaner";

interface PhotosScreen {
    photos: PhotoItem[]; 
    mainPhotoId: string | null;
    setMainPhotoId: (value: string) => void;
    onPickPhotos: () => void;
    onPhotosSelected: (files: FileList | null) => void;
    removePhoto: (id: string) => void;
    fileInputRef: RefObject<HTMLInputElement | null>;
}

export default function PhotosScreen({
    photos, 
    mainPhotoId, 
    setMainPhotoId, 
    onPickPhotos, 
    onPhotosSelected,
    removePhoto,
    fileInputRef
}: PhotosScreen) {
  const addApartmentErrors = useAppSelector(selectAddApartmentErrors);
  const photosErrors = addApartmentErrors?.photosCount
  ? [addApartmentErrors.photosCount]
  : []; 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 ml-2 mr-2 mt-1">
      <div>
        <h1 className="text-4xl font-bold text-[#1a1a1a]">
          What does your place look like?
        </h1>
        <StepErrorBanner messages={photosErrors}/>
        <div className="mt-8 space-y-6">
          <Card className="rounded-md">
            <CardContent className="p-6">
              <div className="text-sm font-semibold text-[#1a1a1a]">
                Upload at least 5 photos of your property.
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                The more you upload, the more likely you are to get bookings.
                You can add more later.
              </div>

              {/* Drop area */}
              <div className="mt-5 rounded-md border-2 border-dashed p-8 text-center">
                <div className="text-sm font-semibold text-[#1a1a1a]">
                  Drag and drop or
                </div>

                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onPickPhotos}
                    className="border-[#0071c2] text-[#0071c2] hover:bg-[#e6f0fa]"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload photos
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    multiple
                    className="hidden"
                    onChange={(e) => onPhotosSelected(e.target.files)}
                  />
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  jpg/jpeg or png, maximum 47MB each
                </div>
              </div>

              <Separator className="my-6" />

              <div className="text-sm text-muted-foreground leading-6">
                Choose a <span className="font-semibold">main photo</span> that
                will make a good first impression. Click photos to set as main,
                and remove photos using the X.
              </div>

              {/* Thumbnails */}
              <div className="mt-6 grid grid-cols-2 gap-5">
                {photos.map((p) => {
                  const isMain = p.id === mainPhotoId;
                  return (
                    <div
                      key={p.id}
                      className={[
                        "relative rounded-md overflow-hidden border shadow-sm cursor-pointer",
                        isMain ? "ring-2 ring-orange-400" : "",
                      ].join(" ")}
                      onClick={() => setMainPhotoId(p.id)}
                      title={isMain ? "Main photo" : "Set as main"}
                    >
                      {isMain && (
                        <div className="absolute left-3 top-3 z-10">
                          <span className="text-xs font-semibold bg-orange-500 text-white px-2 py-1 rounded">
                            Main photo
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full bg-white/95 grid place-items-center shadow"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto(p.id);
                        }}
                        aria-label="Remove photo"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <img
                        src={p.url}
                        alt="Uploaded"
                        className="h-44 w-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bottom validation text (like screenshot) */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>
              {photos.length >= 5
                ? "Great! You have enough photos to continue."
                : `Upload at least ${Math.max(0, 5 - photos.length)} more photo${
                    5 - photos.length === 1 ? "" : "s"
                  } to continue`}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <HelpCard
          icon={<ThumbsUp className="h-5 w-5" />}
          title="What if I don't have professional photos?"
        >
          <p>
            No problem! You can use a smartphone or digital camera. Use bright
            lighting and show the key areas guests care about most.
          </p>
          <div className="mt-3">
            <button
              type="button"
              className="text-[#0071c2] hover:underline text-sm font-medium"
            >
              Here are some tips for taking great photos of your property
            </button>
          </div>
          <p className="mt-3">
            Only use photos you have permission to use.
          </p>
        </HelpCard>
      </div>
    </div>
  )
}
