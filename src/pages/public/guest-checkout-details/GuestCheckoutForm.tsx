import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CheckoutDetailsFormState } from "@/types/form-config/CheckoutFormControlls";
import type { Dispatch, FormEvent, SetStateAction } from "react";

interface GuestCheckoutFormProps {
    formInput: CheckoutDetailsFormState;
    setFormInput: Dispatch<SetStateAction<CheckoutDetailsFormState>>;
    handleSubmit: (e: FormEvent<Element>) => void;
    isValid: boolean
}

export default function GuestCheckoutForm({formInput, setFormInput, handleSubmit, isValid}: GuestCheckoutFormProps) {
    return (
        <Card className="mt-4">
            <CardContent className="p-0">
                <div className="px-5 py-4 bg-blue-50 border-b flex items-center justify-between">
                    <div className="font-semibold text-[#1a1a1a]">Are you traveling for work?</div>
                    <div className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded">
                        Almost done! Just fill in the <span className="font-bold">*</span> required info
                    </div>
                </div>

                <div className="p-5">
                    {/* Travel for work radios */}
                    <div className="flex items-center gap-6 text-sm text-gray-800">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="travelingForWork"
                                checked={formInput.travelingForWork === "yes"}
                                onChange={() => setFormInput((s: CheckoutDetailsFormState) => ({ ...s, travelingForWork: "yes" }))}
                            />
                            Yes
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="travelingForWork"
                                checked={formInput.travelingForWork === "no"}
                                onChange={() => setFormInput((s: CheckoutDetailsFormState) => ({ ...s, travelingForWork: "no" }))}
                            />
                            No
                        </label>
                    </div>

                    {/* Grid for first/last/title like Booking */}
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-[110px_1fr_1fr] gap-4">
                        {/* Title */}
                        <div>
                            <div className="text-sm font-semibold text-gray-800 mb-2">Title</div>
                            {/* Use your FormFields select via CommonForm? We’ll keep it simple inline or via controls.
                          If you want title inside CommonForm grid, keep it there and remove this block. */}
                            {/* Quick inline select */}
                            <select
                                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm"
                                value={formInput.title}
                                onChange={(e) => setFormInput((s: CheckoutDetailsFormState) => ({ ...s, title: e.target.value as any }))}
                            >
                                <option value="">Select</option>
                                <option value="Mr">Mr</option>
                                <option value="Ms">Ms</option>
                                <option value="Mrs">Mrs</option>
                            </select>
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-800 mb-2">First Name *</div>
                            <input
                                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm"
                                value={formInput.firstName}
                                onChange={(e) => setFormInput((s: CheckoutDetailsFormState) => ({ ...s, firstName: e.target.value }))}
                            />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-800 mb-2">Last Name *</div>
                            <input
                                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm"
                                value={formInput.lastName}
                                onChange={(e) => setFormInput((s: CheckoutDetailsFormState) => ({ ...s, lastName: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Email / confirm */}
                    <div className="mt-5 grid gap-4">
                        <div>
                            <div className="text-sm font-semibold text-gray-800 mb-2">Email Address *</div>
                            <input
                                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm"
                                value={formInput.email}
                                onChange={(e) => setFormInput((s: CheckoutDetailsFormState) => ({ ...s, email: e.target.value }))}
                            />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-800 mb-2">Confirm Email Address *</div>
                            <input
                                className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm"
                                value={formInput.confirmEmail}
                                onChange={(e) => setFormInput((s: CheckoutDetailsFormState) => ({ ...s, confirmEmail: e.target.value }))}
                            />
                        </div>

                        {/* Phone like Booking (country code + number) */}
                        <div>
                            <div className="text-sm font-semibold text-gray-800 mb-2">Telephone (mobile number preferred) *</div>
                            <div className="flex gap-3">
                                <select
                                    className="h-10 rounded-md border border-gray-300 px-3 text-sm w-28"
                                    value={formInput.phoneCountryCode}
                                    onChange={(e) => setFormInput((s: CheckoutDetailsFormState) => ({ ...s, phoneCountryCode: e.target.value }))}
                                >
                                    <option value="+30">+30</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                </select>
                                <input
                                    className="flex-1 h-10 rounded-md border border-gray-300 px-3 text-sm"
                                    value={formInput.phoneNumber}
                                    onChange={(e) => setFormInput((s: CheckoutDetailsFormState) => ({ ...s, phoneNumber: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Room card section */}
                    <div className="mt-7 rounded-md bg-gray-50 border p-4">
                        <div className="text-lg font-semibold text-[#1a1a1a]">Standard Studio</div>
                        <div className="mt-1 text-sm text-gray-700">Non-refundable</div>

                        <div className="mt-3 inline-flex items-center gap-3 border border-green-300 bg-green-50 px-3 py-2 rounded-md">
                            <div className="h-9 w-9 rounded bg-green-600 text-white font-bold flex items-center justify-center">
                                9.0
                            </div>
                            <div>
                                <div className="font-semibold text-green-800 leading-tight">Sparkly clean</div>
                                <div className="text-xs text-green-800/80">298 reviews</div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="font-semibold text-sm text-[#1a1a1a]">Special requests <span className="text-gray-500 font-normal">(optional)</span></div>
                            <div className="text-xs text-gray-600 mt-1">
                                Requests aren&apos;t guaranteed and are subject to availability at the property — confirm at check-in.
                            </div>

                            <div className="mt-3">
                                <div className="flex items-center justify-between text-sm text-gray-700">
                                    <div className="font-semibold">Your request</div>
                                    <div className="text-xs text-gray-500">{formInput.specialRequest.length} / 360</div>
                                </div>
                                <textarea
                                    className="mt-2 w-full min-h-[90px] rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    placeholder="Please write your requests in English."
                                    value={formInput.specialRequest}
                                    maxLength={360}
                                    onChange={(e) => setFormInput((s: CheckoutDetailsFormState) => ({ ...s, specialRequest: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer actions */}
                    <div className="mt-6 flex items-center justify-between">
                        <button className="text-sm text-[#0071c2] hover:underline">
                            What are my booking conditions?
                        </button>

                        <Button
                            className="bg-[#0071c2] hover:bg-[#005fa3] h-12 px-8 text-lg font-extrabold rounded-md"
                            disabled={!isValid}
                            onClick={handleSubmit}
                            type="button"
                        >
                            Next: Final details →
                        </Button>
                    </div>

                    <div className="mt-2 text-xs text-gray-600 text-right">
                        Don&apos;t worry — you won&apos;t be charged yet!
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
