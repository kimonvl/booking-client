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
import { getAmenitiesDictionaryStart, getCountryDictionaryStart, getLanguageDictionaryStart } from "@/store/dictionaries/dictionarySlice";
import { selectAmenitiesDictionary, selectCountryDictionary, selectLanguageDictionary } from "@/store/dictionaries/dictionary.selector";
import type { AddressType, IsParkingAvailableType, PetsAllowedType, PhotoItem, SleepingAreasType, TimeType } from "@/types/request/apartment/addApartmentRequest.types";
import { sendAddApartmentStart, setAddApartmentForm } from "@/store/partner/manage-property/apartment/apartmentSlice";
import { selectAddApartmentForm, selectAddApartmentStepsWithError } from "@/store/partner/manage-property/apartment/apartment.selector";

export type StepsType = "name" | "address" |
  "details" | "amenities" | "services" | "languages" | "rules" |
  "photos" | "price" | "review";

const steps: StepsType[] = ["name", "address",
  "details", "amenities", "services", "languages", "rules",
  "photos", "price", "review"];

export const inputClass = (hasError: boolean) =>
  `w-full rounded-md border px-3 py-2 focus:outline-none ${hasError
    ? "border-red-500 ring-1 ring-red-300 focus:ring-red-400"
    : "border-gray-300 focus:ring-2 focus:ring-blue-400"
  }`;

export default function AddAppartmentPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const apartmentForm = useAppSelector(selectAddApartmentForm);
  const errorSteps = useAppSelector(selectAddApartmentStepsWithError);

  const [activeStep, setActiveStep] = useState<StepsType>(errorSteps.length > 0 ? errorSteps[0] : steps[0]);
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

  const goNextWithError = () => {
    const errIndex = errorSteps.indexOf(activeStep);
    if (errIndex >= 0) {
      const nextIndex = (errIndex + 1) % errorSteps.length;
      setActiveStep(errorSteps[nextIndex]);
    } else {
      setActiveStep(errorSteps[0]);
    }
  }

  const [propertyName, setPropertyName] = useState(apartmentForm.propertyName);

  const countryDictionary = useAppSelector(selectCountryDictionary);
  useEffect(() => {
    if (!countryDictionary || countryDictionary.length === 0)
      dispatch(getCountryDictionaryStart());
  }, [dispatch])
  const [address, setAddress] = useState<AddressType>(apartmentForm.address);

  const [sleepingAreas, setSleepingAreas] = useState<SleepingAreasType>(apartmentForm.sleepingAreas);
  const [guestCount, setGuestCount] = useState(apartmentForm.guestCount);
  const [bathroomCount, setBathroomCount] = useState(apartmentForm.bathroomCount);
  const [allowChildren, setAllowChildren] = useState<boolean>(apartmentForm.allowChildren);
  const [offerCots, setOfferCots] = useState<boolean>(apartmentForm.offerCots);
  const [aptSize, setAptSize] = useState<string>(apartmentForm.aptSize);

  const amenitiesDictionary = useAppSelector(selectAmenitiesDictionary);
  useEffect(() => {
    if (!amenitiesDictionary || amenitiesDictionary.length === 0)
      dispatch(getAmenitiesDictionaryStart());
  }, [dispatch])
  const [amenities, setAmenities] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (!amenitiesDictionary?.length) return;
    if (Object.keys(amenities).length > 0) return;
    // check if amenities are not null to set the state with them
    const initial: Record<string, boolean> = {};
    amenitiesDictionary?.forEach(g => {
      g.items.forEach(item => {
        initial[item.code] = apartmentForm.amenities === null ? false : apartmentForm.amenities[item.code];
      });
    });

    setAmenities(initial);
  }, [amenitiesDictionary]);


  const [serveBreakfast, setServeBreakfast] = useState<boolean>(apartmentForm.serveBreakfast);
  const [isParkingAvailable, setIsParkingAvailable] = useState<IsParkingAvailableType>(apartmentForm.isParkingAvailable);


  const allLanguages = useAppSelector(selectLanguageDictionary);
  useEffect(() => {
    if (!allLanguages || allLanguages.length === 0)
      dispatch(getLanguageDictionaryStart());
  }, [dispatch]);

  useEffect(() => {
    if (!allLanguages || allLanguages.length === 0) return;

    const first = allLanguages.slice(0, 7);
    const rest = allLanguages.slice(7);

    const firstState: Record<string, boolean> = {};
    const restState: Record<string, boolean> = {};

    first.forEach(l => { firstState[l.code] = apartmentForm.languages === null ? false : apartmentForm.languages[l.code]; });
    rest.forEach(l => { restState[l.code] = apartmentForm.additionalLanguages === null ? false : apartmentForm.additionalLanguages[l.code]; });

    setLanguages(firstState);
    setAdditionalLanguages(restState);
  }, [allLanguages]);
  const [languages, setLanguages] = useState<Record<string, boolean>>(apartmentForm.languages === null ? {} : apartmentForm.languages);
  const [additionalLanguages, setAdditionalLanguages] = useState<Record<string, boolean>>(apartmentForm.additionalLanguages === null ? {} : apartmentForm.additionalLanguages);

  const [smokingAllowed, setSmokingAllowed] = useState(apartmentForm.smokingAllowed);
  const [partiesAllowed, setPartiesAllowed] = useState(apartmentForm.partiesAllowed);
  const [petsAllowed, setPetsAllowed] = useState<PetsAllowedType>(apartmentForm.petsAllowed);
  const [checkInFrom, setCheckInFrom] = useState<TimeType>(apartmentForm.checkInFrom);
  const [checkInUntil, setCheckInUntil] = useState<TimeType>(apartmentForm.checkInUntil);
  const [checkOutFrom, setCheckOutFrom] = useState<TimeType>(apartmentForm.checkOutFrom);
  const [checkOutUntil, setCheckOutUntil] = useState<TimeType>(apartmentForm.checkOutUntil);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>(apartmentForm.photos);
  const [mainPhotoId, setMainPhotoId] = useState<string | null>(apartmentForm.mainPhotoId);
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

  const [pricePerNight, setPricePerNight] = useState(apartmentForm.pricePerNight);

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

  const extractCodes = (record: Record<string, boolean>) => {
    return Object.entries(record).filter(([_, v]) => v).map(([code, _]) => code)
  }

  const persistForm = () => {
    dispatch(setAddApartmentForm(
      {
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
        photos,
        mainPhotoId,
        pricePerNight,
      }
    ))
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
      amenities: extractCodes(amenities),
      serveBreakfast,
      isParkingAvailable,
      languages: [...extractCodes(languages), ...extractCodes(additionalLanguages)],
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
      photos,
    };

    dispatch(sendAddApartmentStart(payload));
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
        return true;
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
    if (address.street.length < 3)
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
        goNextWithError={goNextWithError}
        hasErrors={errorSteps.length > 0}
        canContinue={canContinue()}
        persistForm={persistForm}
      />
    </div>
  );
}
