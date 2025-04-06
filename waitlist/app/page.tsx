import { Card } from "@/components/ui/card"
import { CheckCircle, Mail, Zap, BarChart3, Link2, Clock } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100">
      {/* Navigation */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-violet-600" />
          <span className="font-bold text-xl">ColdGenius</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-violet-100 text-violet-700 px-3 py-1 rounded-full">Coming Soon</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          Join Our Beta Waitlist
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-violet-600">AI-Powered</span> Cold Emails That Will Actually Convert
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto mb-12">
          ColdGenius is coming soon — our revolutionary AI tool will generate hyper-personalized cold emails designed to
          get responses, meetings, and deals.
        </p>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto mb-8">
          <WaitlistForm />
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-600">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-violet-600" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-violet-600" />
            <span>Free for early access</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-violet-600" />
            <span>Limited beta spots</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">
          How <span className="text-violet-600">ColdGenius</span> Will Transform Your Outreach
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 border-zinc-200 hover:border-violet-200 transition-all hover:shadow-md">
            <div className="mb-4 bg-violet-50 w-12 h-12 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Personalization</h3>
            <p className="text-zinc-600">
              Our AI will analyze prospect data to craft deeply personalized emails that resonate with each recipient.
            </p>
          </Card>

          <Card className="p-6 border-zinc-200 hover:border-violet-200 transition-all hover:shadow-md">
            <div className="mb-4 bg-violet-50 w-12 h-12 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time A/B Testing</h3>
            <p className="text-zinc-600">
              Automatically test different approaches and continuously improve based on what's actually working.
            </p>
          </Card>

          <Card className="p-6 border-zinc-200 hover:border-violet-200 transition-all hover:shadow-md">
            <div className="mb-4 bg-violet-50 w-12 h-12 rounded-lg flex items-center justify-center">
              <Link2 className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">CRM Integration</h3>
            <p className="text-zinc-600">
              Will seamlessly connect with LinkedIn, Salesforce, HubSpot and other CRMs for an effortless workflow.
            </p>
          </Card>

          <Card className="p-6 border-zinc-200 hover:border-violet-200 transition-all hover:shadow-md">
            <div className="mb-4 bg-violet-50 w-12 h-12 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Proven Templates</h3>
            <p className="text-zinc-600">
              Start with carefully designed templates built to achieve 3-5x higher response rates than industry
              averages.
            </p>
          </Card>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="container mx-auto px-4 py-20 bg-white rounded-3xl my-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Say Goodbye to Cold Email Frustrations</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-violet-50 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">No More Generic Templates</h3>
                <p className="text-zinc-600">
                  ColdGenius will create unique, personalized emails that don't sound like every other cold email in
                  your prospect's inbox.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-violet-50 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">End the Guesswork</h3>
                <p className="text-zinc-600">
                  Stop wondering what works. Our analytics will show exactly which messages are performing and why.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-violet-50 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Save Hours Every Week</h3>
                <p className="text-zinc-600">
                  Generate dozens of high-quality, personalized emails in minutes instead of hours of manual writing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Access Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-zinc-50 p-10 rounded-3xl border border-zinc-200">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Be The First To Experience ColdGenius</h2>
              <p className="text-zinc-600 mb-6">
                We're carefully selecting a limited group of early adopters to join our beta program. As a beta user,
                you'll:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-violet-600 mt-0.5 flex-shrink-0" />
                  <span>Get early access before public release</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-violet-600 mt-0.5 flex-shrink-0" />
                  <span>Receive exclusive beta pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-violet-600 mt-0.5 flex-shrink-0" />
                  <span>Help shape the product with your feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-violet-600 mt-0.5 flex-shrink-0" />
                  <span>Get priority support from our team</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-white p-8 rounded-xl border border-zinc-200">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-violet-600" />
                <h3 className="font-semibold">Limited Beta Spots Available</h3>
              </div>
              <p className="text-zinc-600 mb-6">
                Join our waitlist today to secure your spot in our exclusive beta program.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Our Launch Timeline</h2>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-zinc-200"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              <div className="flex gap-8 relative">
                <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 z-10">
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold mb-2">Beta Waitlist</h3>
                  <p className="text-zinc-600">
                    We're currently accepting applications for our exclusive beta program. Join the waitlist to secure
                    your spot.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 relative">
                <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center flex-shrink-0 z-10">
                  <div className="w-8 h-8 rounded-full bg-zinc-300 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold mb-2">Beta Launch</h3>
                  <p className="text-zinc-600">
                    Selected beta users will receive access to ColdGenius and help us refine the product with their
                    feedback.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 relative">
                <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center flex-shrink-0 z-10">
                  <div className="w-8 h-8 rounded-full bg-zinc-300 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold mb-2">Public Release</h3>
                  <p className="text-zinc-600">
                    After incorporating beta feedback, ColdGenius will be available to the public with special pricing
                    for early adopters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-violet-50 p-12 rounded-3xl">
          <h2 className="text-3xl font-bold mb-6">Be Among the First to Transform Your Cold Email Strategy</h2>
          <p className="text-xl text-zinc-600 mb-8">
            Join our exclusive waitlist today. Limited spots available for our beta program.
          </p>

          <div className="max-w-md mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">When will ColdGenius be available?</h3>
            <p className="text-zinc-600">
              We're currently in the beta phase. Join our waitlist to be notified when you can access the platform.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">How does the AI personalization work?</h3>
            <p className="text-zinc-600">
              Our AI analyzes prospect data from various sources to craft emails that feel personally written for each
              recipient, increasing engagement and response rates.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Will ColdGenius integrate with my existing tools?</h3>
            <p className="text-zinc-600">
              Yes, we're building integrations with popular CRMs including Salesforce, HubSpot, and LinkedIn to ensure a
              seamless workflow.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">How much will ColdGenius cost?</h3>
            <p className="text-zinc-600">
              Pricing details will be announced closer to public launch. Beta users will receive special early adopter
              pricing and benefits.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-zinc-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Mail className="h-5 w-5 text-violet-600" />
            <span className="font-bold">ColdGenius</span>
            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">Beta</span>
          </div>
          <div className="text-sm text-zinc-500">© 2025 ColdGenius. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

