import { useEffect, useRef, useState } from "react";
import StepsProgressBar from "./StepsProgressBar";
import NavigationButons from "./NavigationButons";
import NameScreen from "./screens/NameScreen";
import AddressScreen from "./screens/AddressScreen";
import ApartmentDetailsScreen from "./screens/ApartmentDetailsScreen";
import AmenitiesScreen from "./screens/AmenitiesScreen";
import ServicesScreen from "./screens/ServicesScreen";
import LanguagesScreen from "./screens/LanguagesScreen";
import RulesScreen from "./screens/RulesScreen";
import PhotosScreen from "./screens/PhotosScreen";
import PriceScreen from "./screens/PriceScreen";
import ReviewScreen from "./screens/ReviewScreen";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAmenitiesDictionaryStart } from "@/store/dictionaries/dictionarySlice";
import { selectAmenitiesDictionary } from "@/store/dictionaries/dictionary.selector";

export type StepsType = "name" | "address" |
  "details" | "amenities" | "services" | "languages" | "rules" |
  "photos" | "price" | "review";

export type AddressType = {
  streetName: string;
  streetNumber: string;
  floorNumber: string;
  country: string;
  city: string;
  postCode: string;
}

export type BedroomBedType = "single" | "double" | "king_size";
export type LivingroomBedType = "single_sofa" | "double_sofa";
export type BedroomType = {
  beds: Record<BedroomBedType, number>;
}
export type LivingroomType = {
  beds: Record<LivingroomBedType, number>;
}
export type SleepingAreasType = {
  bedrooms: BedroomType[];
  livingroom: LivingroomType;
}

export type AllowChildrenType = "yes" | "no";
export type OfferCotsType = "yes" | "no";

export type AmenitiesType = "Air conditioning" |
  "Heating" |
  "Free WiFi" |
  "Electric vehicle charging station" |
  "Kitchen" |
  "Kitchenette" |
  "Washing machine" |
  "Flat-screen TV" |
  "Swimming pool" |
  "Hot tub" |
  "Minibar" |
  "Sauna" |
  "Balcony" |
  "Garden view" |
  "Terrace" |
  "View";

export type ServeBreakfastType = "yes" | "no";
export type IsParkingAvailableType = "free" | "paid" | "no";

export type LanguageType =
  "English" |
  "French" |
  "German" |
  "Greek" |
  "Spanish";
export type AdditionalLanguageType =
  "Korean" |
  "Latvian" |
  "Lithuanian" |
  "Malay" |
  "Norwegian" |
  "Polish" |
  "Portuguese" |
  "Romanian" |
  "Russian" |
  "Serbian" |
  "Slovak" |
  "Slovenian" |
  "Swedish" |
  "Thai" |
  "Turkish" |
  "Ukrainian" |
  "Vietnamese";

export type PetsAllowedType = "Yes" | "Upon request" | "No";
export type TimeType = "00:00" |
  "01:00" |
  "02:00" |
  "03:00" |
  "04:00" |
  "05:00" |
  "06:00" |
  "07:00" |
  "08:00" |
  "09:00" |
  "10:00" |
  "11:00" |
  "12:00" |
  "13:00" |
  "14:00" |
  "15:00" |
  "16:00" |
  "17:00" |
  "18:00" |
  "19:00" |
  "20:00" |
  "21:00" |
  "22:00" |
  "23:00";

export type PhotoItem = {
  id: string;
  file: File;
  url: string;
};

const steps: StepsType[] = ["name", "address",
  "details", "amenities", "services", "languages", "rules",
  "photos", "price", "review"];

export default function AddAppartmentPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const amenitiesDictionary = useAppSelector(selectAmenitiesDictionary);

  useEffect(() => {
    dispatch(getAmenitiesDictionaryStart());
  }, [])

  const [activeStep, setActiveStep] = useState<StepsType>(steps[0]);
  const [stepsProgress, setStepsProgress] = useState<Record<StepsType, boolean>>({
    name: false,
    address: false,
    details: false,
    amenities: false,
    services: false,
    languages: false,
    rules: false,
    photos: false,
    price: false,
    review: false,
  })

  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState<AddressType>({
    streetName: "",
    streetNumber: "",
    floorNumber: "",
    country: "",
    city: "",
    postCode: ""
  });

  const [sleepingAreas, setSleepingAreas] = useState<SleepingAreasType>({
    bedrooms: [{ beds: { single: 1, double: 3, king_size: 0 } }],
    livingroom: { beds: { single_sofa: 0, double_sofa: 0 } }
  });
  const [guestCount, setGuestCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [allowChildren, setAllowChildren] = useState<AllowChildrenType>("no");
  const [offerCots, setOfferCots] = useState<OfferCotsType>("no");
  const [aptSize, setAptSize] = useState<string>("");

  const [amenities, setAmenities] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const initial: Record<string, boolean> = {};

    amenitiesDictionary?.forEach(g => {
      g.items.forEach(item => {
        initial[item.code] = false;
      });
    });

    setAmenities(initial);
  }, [amenitiesDictionary]);

  
  const [serveBreakfast, setServeBreakfast] = useState<ServeBreakfastType>("no");
  const [isParkingAvailable, setIsParkingAvailable] = useState<IsParkingAvailableType>("no");

  const [languages, setLanguages] = useState<Record<LanguageType, boolean>>({
    English: false,
    French: false,
    German: false,
    Greek: false,
    Spanish: false,
  });
  const [additionalLanguages, setAdditionalLanguages] = useState<Record<AdditionalLanguageType, boolean>>({
    Korean: false,
    Latvian: false,
    Lithuanian: false,
    Malay: false,
    Norwegian: false,
    Polish: false,
    Portuguese: false,
    Romanian: false,
    Russian: false,
    Serbian: false,
    Slovak: false,
    Slovenian: false,
    Swedish: false,
    Thai: false,
    Vietnamese: false,
    Turkish: false,
    Ukrainian: false,
  });

  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [partiesAllowed, setPartiesAllowed] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState<PetsAllowedType>("No");
  const [checkInFrom, setCheckInFrom] = useState<TimeType>("13:00");
  const [checkInUntil, setCheckInUntil] = useState<TimeType>("16:00");
  const [checkOutFrom, setCheckOutFrom] = useState<TimeType>("13:00");
  const [checkOutUntil, setCheckOutUntil] = useState<TimeType>("16:00");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [mainPhotoId, setMainPhotoId] = useState<string | null>(null);
  useEffect(() => {
    // cleanup object URLs on unmount
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onPickPhotos = () => fileInputRef.current?.click();
  const onPhotosSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const next: PhotoItem[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      next.push({
        id: crypto.randomUUID(),
        file,
        url,
      });
    });

    setPhotos((prev) => {
      const merged = [...prev, ...next];
      // if no main photo yet, set the first
      if (!mainPhotoId && merged.length > 0) {
        setMainPhotoId(merged[0].id);
      }
      return merged;
    });
  };
  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);

      const next = prev.filter((p) => p.id !== id);

      // adjust main photo
      if (mainPhotoId === id) {
        setMainPhotoId(next.length ? next[0].id : null);
      }
      return next;
    });
  };

  const [pricePerNight, setPricePerNight] = useState(0);

  const goBack = () => {
    const idx = steps.indexOf(activeStep);
    if (idx == 0)
      return
    setStepsProgress(prev => ({ ...prev, [activeStep]: false }));
    setActiveStep(steps[idx - 1]);
  }

  const goNext = () => {
    const idx = steps.indexOf(activeStep);
    if (idx == steps.length - 1)
      return;
    setStepsProgress(prev => ({ ...prev, [activeStep]: true }));
    setActiveStep(steps[idx + 1]);
  }

  const addBedroom = () => {
    setSleepingAreas((prev) => {
      const updated = structuredClone(prev); // or immer
      updated.bedrooms.push({ beds: { single: 0, double: 0, king_size: 0 } });
      return updated;
    })
  }

  const removeBedroom = (index: number) => {
    setSleepingAreas((prev) => {
      if (prev.bedrooms.length <= 1) return prev;
      return {
        ...prev,
        bedrooms: prev.bedrooms.filter((_, i) => index != i)
      }
    })
  }

  const onConfirm = () => {
    const payload = {
      propertyName,
      address,
      sleepingAreas,
      guestCount,
      bathroomCount,
      allowChildren,
      offerCots,
      aptSize,
      amenities,
      serveBreakfast,
      isParkingAvailable,
      languages,
      additionalLanguages,
      smokingAllowed,
      partiesAllowed,
      petsAllowed,
      checkInFrom,
      checkInUntil,
      checkOutFrom,
      checkOutUntil,
      photosCount: photos.length,
      mainPhotoId,
      pricePerNight,
    };

    console.log("CONFIRM PAYLOAD", payload);
    navigate("/partner/add-apartment-loader");

    // TODO: call your API
    // await api.createListing(payload)
  };


  const canContinue = (): boolean => {
    switch (activeStep) {
      case "name":
        return validateNameScreen();
        break;
      case "address":
        return validateAddressScreen();
        break;
      case "details":
        return true;
        break;
      case "amenities":
        return validateAmenitiesScreen();
        break;
      case "services":
        return validateServicesScreen();
        break;
      case "languages":
        return true;
        break;
      case "rules":
        return true;
        break;
      case "photos":
        return validatePhotosScreen();
        break;
      case "price":
        return validatePriceScreen();
        break;

      default:
        return false;
        break;
    }
  }

  const validateNameScreen = (): boolean => {
    if (propertyName.length > 3)
      return true;
    return false;
  }

  const validateAddressScreen = (): boolean => {
    if (address.streetName.length < 3)
      return false;
    if (address.streetNumber.length < 1)
      return false;
    if (address.floorNumber.length < 1)
      return false;
    if (address.country.length < 2)
      return false;
    if (address.city.length < 2)
      return false;
    if (address.postCode.length < 2)
      return false;
    return true;
  }

  const validateAmenitiesScreen = (): boolean => {
    return Object.entries(amenities).filter(([_name, selected]) => selected).length > 0;
  }

  const validateServicesScreen = (): boolean => {
    return serveBreakfast.length > 0 && isParkingAvailable.length > 0;
  }

  const validatePhotosScreen = (): boolean => {
    return photos.length >= 5;
  }

  const validatePriceScreen = (): boolean => {
    return pricePerNight > 0;
  }

  const renderScreen = () => {
    switch (activeStep) {
      case "name":
        return <NameScreen
          propertyName={propertyName}
          setPropertyName={setPropertyName}
        />
      case "address":
        return <AddressScreen
          address={address}
          setAddress={setAddress}
        />
      case "details":
        return <ApartmentDetailsScreen
          sleepingAreas={sleepingAreas}
          setSleepingAreas={setSleepingAreas}
          addBedroom={addBedroom}
          removeBedroom={removeBedroom}
          guestCount={guestCount}
          setGuestCount={setGuestCount}
          bathroomCount={bathroomCount}
          setBathroomCount={setBathroomCount}
          allowChildren={allowChildren}
          setAllowChildren={setAllowChildren}
          offerCots={offerCots}
          setOfferCots={setOfferCots}
          aptSize={aptSize}
          setAptSize={setAptSize}
        />
      case "amenities":
        return <AmenitiesScreen
          amenities={amenities}
          setAmenities={setAmenities}
        />
      case "services":
        return <ServicesScreen
          serveBreakfast={serveBreakfast}
          setServeBreakfast={setServeBreakfast}
          isParkingAvailable={isParkingAvailable}
          setIsParkingAvailable={setIsParkingAvailable}
        />
      case "languages":
        return <LanguagesScreen
          languages={languages}
          setLanguages={setLanguages}
          additionalLanguages={additionalLanguages}
          setAdditionalLanguages={setAdditionalLanguages}
        />
      case "rules":
        return <RulesScreen
          smokingAllowed={smokingAllowed}
          setSmokingAllowed={setSmokingAllowed}
          partiesAllowed={partiesAllowed}
          setPartiesAllowed={setPartiesAllowed}
          petsAllowed={petsAllowed}
          setPetsAllowed={setPetsAllowed}
          checkInFrom={checkInFrom}
          setCheckInFrom={setCheckInFrom}
          checkInUntil={checkInUntil}
          setCheckInUntil={setCheckInUntil}
          checkOutFrom={checkOutFrom}
          setCheckOutFrom={setCheckOutFrom}
          checkOutUntil={checkOutUntil}
          setCheckOutUntil={setCheckOutUntil}
        />
      case "photos":
        return <PhotosScreen
          photos={photos}
          mainPhotoId={mainPhotoId}
          setMainPhotoId={setMainPhotoId}
          onPickPhotos={onPickPhotos}
          onPhotosSelected={onPhotosSelected}
          removePhoto={removePhoto}
          fileInputRef={fileInputRef}
        />
      case "price":
        return <PriceScreen
          pricePerNight={pricePerNight}
          setPricePerNight={setPricePerNight}
        />
      case "review":
        return <ReviewScreen
          propertyName={propertyName}
          address={address}
          sleepingAreas={sleepingAreas}
          guestCount={guestCount}
          bathroomCount={bathroomCount}
          allowChildren={allowChildren}
          offerCots={offerCots}
          aptSize={aptSize}
          amenities={amenities}
          serveBreakfast={serveBreakfast}
          isParkingAvailable={isParkingAvailable}
          languages={languages}
          additionalLanguages={additionalLanguages}
          smokingAllowed={smokingAllowed}
          partiesAllowed={partiesAllowed}
          petsAllowed={petsAllowed}
          checkInFrom={checkInFrom}
          checkInUntil={checkInUntil}
          checkOutFrom={checkOutFrom}
          checkOutUntil={checkOutUntil}
          photos={photos}
          mainPhotoId={mainPhotoId}
          pricePerNight={pricePerNight}
          onConfirm={onConfirm}
        />

      default:
        break;
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <StepsProgressBar
        steps={steps}
        stepsProgress={stepsProgress}
        activeStep={activeStep}
      />
      {
        renderScreen()
      }
      <NavigationButons
        goBack={goBack}
        goNext={goNext}
        canContinue={canContinue()}
      />
    </div>
  );
}
