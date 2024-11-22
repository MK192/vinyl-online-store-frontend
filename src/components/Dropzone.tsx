import { ReactNode } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  children: ReactNode;
  onDrop: (acceptedFiles: Blob[]) => void;
};
export default function Dropzone({ children, onDrop }: Props) {
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
        {children}
      </div>
    </section>
  );
}
