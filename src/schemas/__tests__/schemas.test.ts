import { contactSchema, projectSchema, loginSchema } from "@/schemas"

describe("contactSchema", () => {
  const validContact = {
    name: "Tsiory Antonio",
    email: "tsiory@opendev.mg",
    projectDescription: "Je veux développer une application mobile de gestion RH.",
    budget: "5000-10000",
  }

  it("accepte des données valides", () => {
    const result = contactSchema.safeParse(validContact)
    expect(result.success).toBe(true)
  })

  it("rejette un nom trop court", () => {
    const result = contactSchema.safeParse({ ...validContact, name: "T" })
    expect(result.success).toBe(false)
  })

  it("rejette un email invalide", () => {
    const result = contactSchema.safeParse({ ...validContact, email: "pas-un-email" })
    expect(result.success).toBe(false)
  })

  it("rejette une description trop courte", () => {
    const result = contactSchema.safeParse({ ...validContact, projectDescription: "Trop court" })
    expect(result.success).toBe(false)
  })

  it("rejette une description trop longue", () => {
    const result = contactSchema.safeParse({ ...validContact, projectDescription: "a".repeat(1001) })
    expect(result.success).toBe(false)
  })

  it("rejette si budget manquant", () => {
    const result = contactSchema.safeParse({ ...validContact, budget: "" })
    expect(result.success).toBe(false)
  })
})

describe("projectSchema", () => {
  const validProject = {
    title: "Application RH",
    clientName: "Acme Corp",
    shortDescription: "Une app RH moderne",
    longDescription: "Description complète du projet RH.",
    duration: 30,
    teamSize: 3,
    technologyIds: [],
  }

  it("accepte des données valides", () => {
    const result = projectSchema.safeParse(validProject)
    expect(result.success).toBe(true)
  })

  it("applique les valeurs par défaut", () => {
    const result = projectSchema.safeParse(validProject)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.status).toBe("COMPLETED")
      expect(result.data.featured).toBe(false)
      expect(result.data.hideClientName).toBe(false)
    }
  })

  it("rejette un titre trop court", () => {
    const result = projectSchema.safeParse({ ...validProject, title: "A" })
    expect(result.success).toBe(false)
  })

  it("rejette une durée négative", () => {
    const result = projectSchema.safeParse({ ...validProject, duration: 0 })
    expect(result.success).toBe(false)
  })

  it("rejette une teamSize invalide", () => {
    const result = projectSchema.safeParse({ ...validProject, teamSize: 0 })
    expect(result.success).toBe(false)
  })

  it("accepte un status valide", () => {
    const result = projectSchema.safeParse({ ...validProject, status: "IN_PROGRESS" })
    expect(result.success).toBe(true)
  })

  it("rejette un status invalide", () => {
    const result = projectSchema.safeParse({ ...validProject, status: "UNKNOWN" })
    expect(result.success).toBe(false)
  })
})

describe("loginSchema", () => {
  it("accepte des credentials valides", () => {
    const result = loginSchema.safeParse({ email: "admin@opendev.mg", password: "motdepasse123" })
    expect(result.success).toBe(true)
  })

  it("rejette un mot de passe trop court", () => {
    const result = loginSchema.safeParse({ email: "admin@opendev.mg", password: "court" })
    expect(result.success).toBe(false)
  })
})
