"use client";

import { ContactGlassSelect } from "./ContactGlassSelect";
import { CONTACT_HEAR_ABOUT_OPTIONS, hearAboutChannelLabel } from "@/lib/contact-hear-about-options";

const OTHER_VALUE = "other";

type Props = {
  channelValue: string;
  onChannelChange: (value: string) => void;
  otherDetail: string;
  onOtherDetailChange: (value: string) => void;
};

export function ContactHearAboutSelect({
  channelValue,
  onChannelChange,
  otherDetail,
  onOtherDetailChange,
}: Props) {
  return (
    <div className="contact-hear-about-stack">
      <ContactGlassSelect
        options={CONTACT_HEAR_ABOUT_OPTIONS}
        value={channelValue}
        onChange={(v) => {
          onChannelChange(v);
          if (v !== OTHER_VALUE) onOtherDetailChange("");
        }}
        fieldLabel="How did you hear about us?"
        placeholder="Select an option"
        resolveDisplayLabel={(v) => (v ? hearAboutChannelLabel(v) : "")}
      />
      {channelValue === OTHER_VALUE ? (
        <label className="contact-field" style={{ marginTop: 12 }}>
          <input
            type="text"
            required
            placeholder=" "
            value={otherDetail}
            onChange={(e) => onOtherDetailChange(e.target.value)}
            autoComplete="off"
          />
          <span>Please specify *</span>
        </label>
      ) : null}
    </div>
  );
}
