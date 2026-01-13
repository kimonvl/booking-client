
export default function Footer() {
    return (
        <footer className="border-t mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
                <div>
                    <h4 className="font-semibold mb-2">Υποστήριξη</h4>
                    <ul className="space-y-1 text-muted-foreground">
                        <li>Εξυπηρέτηση πελατών</li>
                        <li>Κέντρο βοήθειας</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Ανακαλύψτε</h4>
                    <ul className="space-y-1 text-muted-foreground">
                        <li>Genius</li>
                        <li>Ταξιδιωτικά άρθρα</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Όροι</h4>
                    <ul className="space-y-1 text-muted-foreground">
                        <li>Πολιτική απορρήτου</li>
                        <li>Όροι χρήσης</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Συνεργάτες</h4>
                    <ul className="space-y-1 text-muted-foreground">
                        <li>Extranet</li>
                        <li>Γίνετε affiliate</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Σχετικά με εμάς</h4>
                    <ul className="space-y-1 text-muted-foreground">
                        <li>Η Booking.com</li>
                        <li>Καριέρα</li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-xs text-muted-foreground pb-6">
                © 1996–2025 Booking.com™
            </div>
        </footer>
    )
}
