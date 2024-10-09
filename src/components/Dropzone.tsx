import { useDropzone } from "react-dropzone";

type Props = {
  text: string;
  onDrop: (acceptedFiles: Blob[]) => void;
};
export default function Dropzone({ text, onDrop }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: onDrop,
  });
  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>{text}</p>
      </div>
    </section>
  );
}
