"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const loadPartners = async () => {
    const { data } = await supabase
      .from("partners")
      .select("*")
      .order("id", { ascending: false });

    setPartners(data || []);
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const makeSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const uploadLogo = async (file: File) => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("partner-logos")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("partner-logos")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const savePartner = async () => {
    if (!name) {
      setMsg("Partner name is required");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      let logo_url = "";

      if (logoFile) {
        logo_url = await uploadLogo(logoFile);
      }

      const finalSlug = slug || makeSlug(name);

      if (editingId) {
        const { error } = await supabase
          .from("partners")
          .update({
            name,
            slug: finalSlug,
            ...(logo_url && { logo_url }),
          })
          .eq("id", editingId);

        if (error) throw error;

        setMsg("✅ Partner updated");
      } else {
        const { error } = await supabase.from("partners").insert([
          {
            name,
            slug: finalSlug,
            logo_url,
            is_active: true,
          },
        ]);

        if (error) throw error;

        setMsg("✅ Partner added");
      }

      setName("");
      setSlug("");
      setLogoFile(null);
      setEditingId(null);
      await loadPartners();
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const editPartner = (partner: any) => {
    setEditingId(partner.id);
    setName(partner.name);
    setSlug(partner.slug);
    setMsg("");
  };

  const togglePartner = async (partner: any) => {
    await supabase
      .from("partners")
      .update({ is_active: !partner.is_active })
      .eq("id", partner.id);

    loadPartners();
  };

  const deletePartner = async (id: number) => {
    if (!confirm("Delete this partner?")) return;

    await supabase.from("partners").delete().eq("id", id);
    loadPartners();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
      <h1 className="text-2xl font-semibold text-slate-900">
        Manage Partners
      </h1>

      <div className="rounded-2xl border bg-white p-5 sm:p-6 space-y-4">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!editingId) setSlug(makeSlug(e.target.value));
          }}
          placeholder="Partner name"
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <input
          value={slug}
          onChange={(e) => setSlug(makeSlug(e.target.value))}
          placeholder="Slug, example: scott-edil"
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Partner Logo
          </label>

          <label className="inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
            📤 Upload Logo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
            />
          </label>

          {logoFile && (
            <p className="mt-1 truncate text-xs text-slate-500">
              Selected: {logoFile.name}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={savePartner}
            disabled={loading}
            className="cursor-pointer rounded-xl bg-emerald-600 px-5 py-2.5 text-white transition hover:bg-emerald-700"
          >
            {loading ? "Saving..." : editingId ? "Update Partner" : "Add Partner"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setName("");
                setSlug("");
                setLogoFile(null);
              }}
              className="cursor-pointer text-sm text-slate-500 hover:text-slate-800"
            >
              Cancel edit
            </button>
          )}
        </div>

        {msg && <p className="text-sm text-slate-700">{msg}</p>}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              {partner.logo_url && (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="h-16 w-24 rounded-xl border object-contain p-2"
                />
              )}

              <div className="flex-1">
                <div className="font-semibold text-slate-900">
                  {partner.name}
                </div>
                <div className="text-sm text-slate-500">
                  {partner.slug}
                </div>
              </div>

              <span
                className={`rounded-full border px-2 py-1 text-xs ${
                  partner.is_active
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
              >
                {partner.is_active ? "Visible" : "Hidden"}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => editPartner(partner)}
                className="cursor-pointer rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-600 transition hover:bg-blue-100"
              >
                Edit
              </button>

              <button
                onClick={() => togglePartner(partner)}
                className="cursor-pointer rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-200"
              >
                {partner.is_active ? "Hide" : "Show"}
              </button>

              <button
                onClick={() => deletePartner(partner.id)}
                className="cursor-pointer rounded-lg bg-red-50 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}