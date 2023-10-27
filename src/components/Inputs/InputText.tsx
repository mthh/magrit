import { type JSX } from 'solid-js';
import { type LocalizedString } from 'typesafe-i18n';

interface InputFieldTextProps {
  label: LocalizedString | string;
  value?: string;
  placeholder?: string;
  onChange?: (text: string) => void;
  onKeyUp?: (text: string) => void;
  width?: number;
}

export default function InputFieldText(props: InputFieldTextProps): JSX.Element {
  return <div class="field">
    <label class="label">{ props.label }</label>
    <div class="control">
      <input
        class="text"
        type="text"
        onChange={(e) => { if (props.onChange) props.onChange(e.currentTarget.value); }}
        onKeyUp={(e) => { if (props.onKeyUp) props.onKeyUp(e.currentTarget.value); }}
        value={ props.value || '' }
        placeholder={ props.placeholder }
        style={{ width: props.width ? `${props.width}px` : 'unset' }}
      />
    </div>
  </div>;
}
