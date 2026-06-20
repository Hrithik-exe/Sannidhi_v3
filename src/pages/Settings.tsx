import {
  Settings2,
  ReceiptText,
  CloudUpload,
  Printer,
  Shield,
  Database,
  Landmark,
  Languages,
  Clock,
  Hash,
  SlidersHorizontal,
  Info,
  MapPin,
  Phone,
  ImageIcon,
  AlignLeft,
  LayoutTemplate,
  Monitor,
  MessageSquare,
  HardDriveUpload,
  HardDriveDownload,
  History,
  UserCog,
  ShieldCheck,
  LogIn,
  Trash2,
  Upload,
  Download,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

type SettingItem = { label: string; icon: LucideIcon };

type SettingSection = {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  items: SettingItem[];
};

const SECTIONS: SettingSection[] = [
  {
    id: "general",
    title: "General Settings",
    desc: "Manage application preferences and default configurations.",
    icon: Settings2,
    items: [
      { label: "Language & Currency",   icon: Languages         },
      { label: "Date & Time Settings",  icon: Clock             },
      { label: "Receipt Number Format", icon: Hash              },
      { label: "Other Preferences",     icon: SlidersHorizontal },
    ],
  },
  {
    id: "temple",
    title: "Temple Information",
    desc: "Manage temple details and contact information.",
    icon: Landmark,
    items: [
      { label: "Basic Information", icon: Info      },
      { label: "Address",           icon: MapPin    },
      { label: "Contact Details",   icon: Phone     },
      { label: "Temple Logo",       icon: ImageIcon },
    ],
  },
  {
    id: "receipt",
    title: "Receipt Settings",
    desc: "Configure receipt layout and printing preferences.",
    icon: ReceiptText,
    items: [
      { label: "Receipt Prefix & Numbering", icon: AlignLeft     },
      { label: "Receipt Layout",             icon: LayoutTemplate },
      { label: "Display Options",            icon: Monitor        },
      { label: "Footer Message",             icon: MessageSquare  },
    ],
  },
  {
    id: "backup",
    title: "Backup & Restore",
    desc: "Backup your data regularly and restore when needed.",
    icon: CloudUpload,
    items: [
      { label: "Create Backup",  icon: HardDriveUpload   },
      { label: "Restore Backup", icon: HardDriveDownload },
      { label: "Backup History", icon: History           },
    ],
  },
  {
    id: "printer",
    title: "Printer Settings",
    desc: "Configure printers and print preferences.",
    icon: Printer,
    items: [
      { label: "Add / Manage Printers", icon: Printer },
      { label: "Default Printer",       icon: Printer },
      { label: "Print Test Page",       icon: Printer },
    ],
  },
  {
    id: "security",
    title: "Security",
    desc: "Manage password and security preferences.",
    icon: Shield,
    items: [
      { label: "Change Password",           icon: UserCog     },
      { label: "Two-Factor Authentication", icon: ShieldCheck },
      { label: "Session Management",        icon: LogIn       },
    ],
  },
  {
    id: "data",
    title: "Data Management",
    desc: "Manage and maintain your data effectively.",
    icon: Database,
    items: [
      { label: "Clear Old Data", icon: Trash2   },
      { label: "Export Data",    icon: Download },
      { label: "Import Data",    icon: Upload   },
    ],
  },
];

export default function Settings() {
  return (
    <>
      <style>{`
        .st-main { display: flex; flex-direction: column; gap: 1.1rem; }

        .st-title    { font-size: 1.5rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
        .st-subtitle { margin-top: 0.2rem; font-size: 0.8rem; color: #71717a; }

        .st-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.85rem;
        }

        .st-card {
          border-radius: 0.75rem; border: 1px solid #1f1f23;
          background: #101010; padding: 1.1rem 1.1rem 0.6rem;
          display: flex; flex-direction: column;
          transition: border-color 160ms;
        }
        .st-card:hover { border-color: #3a2e12; }

        .st-card-top  { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.85rem; }
        .st-card-icon {
          display: grid; place-items: center;
          width: 2.4rem; height: 2.4rem; border-radius: 0.6rem;
          border: 1px solid #4b391d; background: #17130c;
          color: #d8aa4a; flex-shrink: 0;
        }
        .st-card-title { font-size: 0.88rem; font-weight: 700; color: #e4e4e7; }
        .st-card-desc  { font-size: 0.72rem; color: #71717a; margin-top: 0.25rem; line-height: 1.5; }

        .st-card-items { display: flex; flex-direction: column; }
        .st-card-item  {
          display: flex; align-items: center; justify-content: space-between;
          gap: 0.5rem; padding: 0.5rem 0.1rem;
          border-top: 1px solid #141418;
          cursor: pointer; transition: color 130ms; color: #71717a;
        }
        .st-card-item:hover                    { color: #d8aa4a; }
        .st-card-item:hover .st-item-icon      { color: #d8aa4a; }
        .st-card-item:hover .st-item-arrow     { color: #d8aa4a; }
        .st-item-left  { display: flex; align-items: center; gap: 0.5rem; }
        .st-item-icon  { color: #52525b; flex-shrink: 0; transition: color 130ms; }
        .st-item-label { font-size: 0.75rem; font-weight: 500; }
        .st-item-arrow { color: #3f3f46; transition: color 130ms; }

        @media (max-width: 1200px) { .st-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 700px)  { .st-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="st-main">
        <div>
          <h1 className="st-title">General Settings</h1>
          <p className="st-subtitle">Manage general preferences of the application.</p>
        </div>

        <div className="st-grid">
          {SECTIONS.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.id} className="st-card">
                <div className="st-card-top">
                  <div className="st-card-icon">
                    <SectionIcon size={17} />
                  </div>
                  <div>
                    <p className="st-card-title">{section.title}</p>
                    <p className="st-card-desc">{section.desc}</p>
                  </div>
                </div>

                <div className="st-card-items">
                  {section.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.label} className="st-card-item">
                        <div className="st-item-left">
                          <ItemIcon size={13} className="st-item-icon" />
                          <span className="st-item-label">{item.label}</span>
                        </div>
                        <ChevronRight size={13} className="st-item-arrow" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}