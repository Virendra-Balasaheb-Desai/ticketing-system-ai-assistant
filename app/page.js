export default function Home() {
  return (
    <div className="bg-base-100 text-base-content">

      {/* Hero Section */}
      <div className="hero min-h-[80vh] bg-base-300">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">
              Smarter Ticket Management with AI
            </h1>
            <p className="py-6 text-lg">
              Automatically categorize, prioritize, and assign tickets to the right moderators — powered by AI.
            </p>
              <button className="btn btn-primary mr-3">Get Started</button>
            <button className="btn btn-outline">Raise a Ticket</button>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="card bg-base-200 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="card-body">
              <h3 className="card-title">AI Processing</h3>
              <p>Automatic categorization, priority detection, and AI-generated notes.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="card-body">
              <h3 className="card-title">Smart Assignment</h3>
              <p>Assign tickets based on moderator skills with fallback support.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="card-body">
              <h3 className="card-title">User Roles</h3>
              <p>Role-based access for users, moderators, and admins.</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="card-body">
              <h3 className="card-title">Async Processing</h3>
              <p>Event-driven workflows with automated email notifications.</p>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-base-200 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center">

          <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300 w-full md:w-1/4">
            <div className="card-body">
              <h3 className="font-bold text-lg">1. Create Ticket</h3>
              <p>User submits issue with details.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300 w-full md:w-1/4">
            <div className="card-body">
              <h3 className="font-bold text-lg">2. AI Analysis</h3>
              <p>AI detects priority, category, and required skills.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300 w-full md:w-1/4">
            <div className="card-body">
              <h3 className="font-bold text-lg">3. Assign Moderator</h3>
              <p>System matches the best moderator automatically.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300 w-full md:w-1/4">
            <div className="card-body">
              <h3 className="font-bold text-lg">4. Notify</h3>
              <p>Email sent with ticket details and AI notes.</p>
            </div>
          </div>

        </div>
      </section>

      {/* GLASS CTA */}
      <section className="py-24 px-6 flex justify-center">

        <div className="backdrop-blur-lg bg-base-200/60 border border-base-300 rounded-2xl p-10 text-center shadow-xl max-w-2xl">

          <h2 className="text-3xl font-bold mb-4">
            Ready to automate your support system?
          </h2>

          <p className="opacity-80 mb-6">
            Let AI handle repetitive tasks while your team focuses on impact.
          </p>

          <button className="btn btn-primary btn-lg">
            Start Now
          </button>

        </div>

      </section>

    </div>
  );
}
