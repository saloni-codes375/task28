import React from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "A Quiet Walk Through the Forest",
    date: "April 7, 2024",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85",
    description: "Sometimes the best adventures are the ones that invite us to slow down. Follow winding trails, listen to the trees, and discover a little calm away from the noise of everyday life."
  },
  {
    id: 2,
    title: "Finding Your Next Adventure",
    date: "April 12, 2024",
    image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1400&q=85",
    description: "New places give us new perspectives. Pack light, keep an open mind, and let the small unexpected moments become the stories you remember most."
  },
  {
    id: 3,
    title: "The Joy of Getting Outside",
    date: "April 18, 2024",
    image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=500&q=80",
    description: "A little fresh air can change the whole shape of a day. Here are a few simple ways to make room for more movement, curiosity, and fun."
  }
];

function Brand({ onClick }) {
  return <Link className="brand" to="/dashboard" onClick={onClick} aria-label="Wanderly dashboard">
    <span className="brand-mark">✳</span><span>Wanderly<span className="brand-dot">.</span></span>
  </Link>;
}

function Header() {
  return <header className="topbar">
    <Brand />
    <nav className="topnav" aria-label="Main navigation">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </nav>
    <div className="auth-links">
      <Link className="btn btn-light" to="/login">Login</Link>
      <Link className="btn btn-green" to="/signup">Sign Up</Link>
    </div>
  </header>;
}

function Sidebar() {
  return <aside className="sidebar">
    <section className="profile panel">
      <div className="profile-image" role="img" aria-label="Pencil on a desk" />
      <div className="panel-body">
        <h3>My Name</h3>
        <p>Just me, myself and I, exploring the universe of unknownment. I have a heart of love and an interest in lorem ipsum and mauris neque quam blog. I want to share my world with you.</p>
      </div>
    </section>
    <section className="panel popular">
      <h3 className="panel-heading">Popular Posts</h3>
      {[
        ["Lorem", "Sed mattis nunc", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=100&q=75"],
        ["Ipsum", "Praes tinci sed", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=100&q=75"],
        ["Dorum", "Ultricies congue", "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=100&q=75"],
        ["Mingsum", "Lorem ipsum dipsum", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=100&q=75"]
      ].map(([title, sub, image]) => <div className="popular-item" key={title}>
        <img src={image} alt="" /><div><strong>{title}</strong><small>{sub}</small></div>
      </div>)}
    </section>
    <section className="panel tags">
      <h3 className="panel-heading">Tags</h3>
      <div className="tag-list">{["Travel", "New York", "London", "IKEA", "NORWAY", "DIY", "Ideas", "Baby", "Family", "News", "Clothing", "Shopping", "Sports", "Games"].map(tag => <span key={tag}>{tag}</span>)}</div>
    </section>
  </aside>;
}

function PostCard({ post, featured = false }) {
  return <article className={`post-card ${featured ? "featured" : ""}`}>
    <img className="post-image" src={post.image} alt={post.title} />
    <div className="post-content">
      <h2>{post.title.toUpperCase()}</h2>
      <p className="post-meta">Title description, <span>{post.date}</span></p>
      <p className="post-description">{post.description}</p>
      <div className="post-footer">
        <Link className="read-more" to={`/post/${post.id}`}>READ MORE <span>»</span></Link>
        <span className="comments">Comments <b>0</b></span>
      </div>
    </div>
  </article>;
}

function Home() {
  return <div className="page-layout home-layout">
    <main className="home-main">
      <h1 className="page-title">Home</h1>
      <PostCard post={posts[0]} featured />
      <PostCard post={posts[1]} />
    </main>
    <Sidebar />
  </div>;
}

function Dashboard() {
  return <div className="page-layout dashboard-layout">
    <Sidebar />
    <main className="dashboard-main">
      <h1 className="page-title">Home</h1>
      <PostCard post={posts[0]} />
      <PostCard post={posts[1]} featured />
    </main>
  </div>;
}

function PostDetail() {
  const navigate = useNavigate();
  const id = Number(window.location.pathname.split("/").pop());
  const post = posts.find(item => item.id === id) || posts[1];
  return <div className="page-layout detail-layout">
    <Sidebar />
    <main className="detail-main">
      <button className="back-link" onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
      <PostCard post={post} featured />
      <section className="detail-extra panel">
        <h3>About this story</h3>
        <p>{post.description} Take a moment to enjoy the journey and save this story for your next day out.</p>
        <div className="detail-actions"><button className="btn btn-light" onClick={() => navigate("/")}>Back Home</button><button className="btn btn-green" onClick={() => navigate("/dashboard")}>More Stories</button></div>
      </section>
    </main>
  </div>;
}

function AuthPage({ signup = false }) {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });
  const [message, setMessage] = React.useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setMessage(signup ? "Your demo account is ready! (No data was sent.)" : "Demo login successful!");
  }
  return <main className="auth-wrap">
    <div className="auth-card">
      <Brand onClick={() => {}} />
      <div className="auth-intro"><span className="auth-icon">{signup ? "✦" : "↗"}</span>
        <h1>{signup ? "Create your account" : "Welcome back"}</h1>
        <p>{signup ? "Join the community and share your world." : "Log in to continue your journey."}</p>
      </div>
      <form onSubmit={handleSubmit}>
        {signup && <label>Full name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>}
        <label>Email address<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
        <label>Password<input type="password" minLength="6" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" /></label>
        <button className="btn btn-green submit-btn" type="submit">{signup ? "Create account" : "Login"}</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      <p className="auth-switch">{signup ? "Already have an account?" : "New to Wanderly?"} <Link to={signup ? "/login" : "/signup"}>{signup ? "Login" : "Sign up"}</Link></p>
      <button className="text-button" onClick={() => navigate("/")}>← Return to Home</button>
    </div>
  </main>;
}

export default function App() {
  return <div className="app-shell">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage signup />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="*" element={<Home />} />
    </Routes>
    <footer className="site-footer">© 2024 Wanderly. All rights reserved.</footer>
  </div>;
}