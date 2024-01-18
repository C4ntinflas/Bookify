export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="site-title">Bookify</a>
        <ul>
            <li>
                <a href="/books/results">Results</a>
                <a href="/books/create">Create</a>
                <a href="/books/details">Details</a>
                <a href="/books/edit">Edit</a>
                <a href="/books/delete">Delete</a>
            </li>
        </ul>
    </nav>
}