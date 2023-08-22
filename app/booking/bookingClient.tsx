import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";

interface BookingClientProps {
    reservation: SafeReservation[];
    currentUser?: SafeUser | null;
}

const BookingClient: React.FC<BookingClientProps> = ({reservation, currentUser}) => {
    return (
        <Container>
            <Heading 
                title="Booking accomendation"
                subtitle="You can view your reservation history here."
            />
        </Container>
    )
}

export default BookingClient