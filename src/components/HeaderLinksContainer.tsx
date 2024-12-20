//components
import Button from "./Buttons/Button";
import HeaderDropdown from "./Dropdown/HeaderDropdown";

export default function HeaderLinksContainer() {
  return (
    <div className="flex gap-12 text-lg">
      <HeaderDropdown trigger={<Button variant="content">Artists</Button>}>
        <p>Deep purple</p>
      </HeaderDropdown>
      <Button variant="content">Categories</Button>
    </div>
  );
}
