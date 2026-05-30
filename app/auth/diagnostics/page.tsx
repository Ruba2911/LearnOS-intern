'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthDiagnosticsPage() {
  const [results, setResults] = useState<string[]>([])
  const supabase = createClient()

  const testAuth = async () => {
    const logs: string[] = []

    try {
      logs.push('🔍 Starting Auth Diagnostics...')
      setResults([...logs])

      // Test 1: Check env variables
      logs.push(
        `✓ NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)}...`
      )
      logs.push(
        `✓ NEXT_PUBLIC_SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 30)}...`
      )
      setResults([...logs])

      // Test 2: Check current session
      logs.push('\n📋 Checking current session...')
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        logs.push(`❌ Session Error: ${sessionError.message}`)
      } else if (session) {
        logs.push(`✓ Active Session: ${session.user?.email}`)
      } else {
        logs.push('✓ No active session (expected for signup test)')
      }
      setResults([...logs])

      // Test 3: Test signup with test credentials
      logs.push('\n🔑 Testing Sign Up...')
      const testEmail = `test-${Date.now()}@example.com`
      const testPassword = 'TestPassword123!'

      logs.push(`Testing with: ${testEmail}`)
      setResults([...logs])

      const { data, error: signupError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      })

      if (signupError) {
        logs.push(`❌ Signup Error: ${signupError.message}`)
        logs.push(`   Code: ${signupError.status}`)
        logs.push(`   Details: ${JSON.stringify(signupError)}`)
      } else if (data.user) {
        logs.push(`✓ Signup Successful!`)
        logs.push(`   User ID: ${data.user.id}`)
        logs.push(`   Email: ${data.user.email}`)
        logs.push(`   Confirmed: ${data.user.email_confirmed_at ? 'Yes' : 'No (email verification required)'}`)

        // Test 4: Try to sign in
        logs.push('\n🔓 Testing Sign In with new account...')
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: testPassword,
        })

        if (signInError) {
          logs.push(`⚠️ Sign In Error: ${signInError.message}`)
        } else if (signInData.session) {
          logs.push(`✓ Sign In Successful!`)
          logs.push(`   Session Token: ${signInData.session.access_token.substring(0, 20)}...`)

          // Test 5: Try to insert into database
          logs.push('\n🗄️ Testing Database Access...')
          const { data: dbData, error: dbError } = await supabase
            .from('profiles')
            .select('count')
            .single()

          if (dbError) {
            logs.push(`❌ Database Error: ${dbError.message}`)
            logs.push(`   This means either:`)
            logs.push(`   1. Database tables haven't been created`)
            logs.push(`   2. Row Level Security (RLS) is blocking access`)
          } else {
            logs.push(`✓ Database Connected!`)
          }
        }
      }

      logs.push('\n✅ Diagnostics Complete!')
      setResults([...logs])
    } catch (err) {
      logs.push(`\n⚠️ Unexpected Error: ${err instanceof Error ? err.message : String(err)}`)
      setResults([...logs])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Auth Diagnostics</h1>
        <p className="text-slate-400 mb-8">Test your Supabase authentication setup</p>

        <button
          onClick={testAuth}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg mb-8"
        >
          Run Diagnostics
        </button>

        {results.length > 0 && (
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
            <pre className="text-slate-300 whitespace-pre-wrap font-mono text-sm">
              {results.join('\n')}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-slate-700/30 rounded-lg border border-slate-600 p-6">
          <h2 className="text-white font-bold mb-4">📋 Troubleshooting Guide</h2>
          <ul className="text-slate-300 space-y-2 list-disc list-inside">
            <li>
              <strong>400 Error on Signup:</strong> Check that Supabase Email Auth is enabled
            </li>
            <li>
              <strong>Database Error:</strong> Run database-schema.sql in Supabase SQL Editor
            </li>
            <li>
              <strong>Email Confirmation Required:</strong> Normal - check email to confirm account
            </li>
            <li>
              <strong>RLS Blocking Access:</strong> RLS policies should allow authenticated users
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
