"use client"
import { useRouter, useSearchParams } from "next/navigation";
import Modals from "./Modals";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEP {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEP.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEP.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringify({
            url: '/',
            query: updatedQuery
        }, { skipNull: true});

        setStep(STEP.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, 
    [
        step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEP.INFO) {
            return "Search"
        }
        return "Next"
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEP.LOCATION) {
            return undefined;
        }
        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Where do ou wanna go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect 
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEP.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Where do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <Calendar 
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEP.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="More information"
                    subtitle="Find your perfect place!"
                />
                <Counter 
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter 
                    title="Rooms"
                    subtitle="How many room do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter 
                    title="Bathroom"
                    subtitle="How many bathroom do you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }

    return (
        <Modals 
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEP.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default SearchModal;