const goals = [
    {
      "Name": "250mm",
      "CodeName": "MortarTankAmmo",
      "Category": "Heavy Ammunition",
      "Goal": "200",
      "Source": "MPF Baccae",
      "BMAT": "660.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "550.00",
      "Salvage": "1,320.00",
      "Components": "0.00",
      "Sulfur": "2,750.00"
    },
    {
      "Name": "40mm",
      "CodeName": "LightTankAmmo",
      "Category": "Heavy Ammunition",
      "Goal": "200",
      "Source": "MPF Baccae",
      "BMAT": "880.00",
      "EMAT": "660.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "8,360.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "120mm",
      "CodeName": "LightArtilleryAmmo",
      "Category": "Heavy Ammunition",
      "Goal": "0",
      "Source": "MPF Baccae",
      "BMAT": "660.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "24.00",
      "Salvage": "1,320.00",
      "Components": "0.00",
      "Sulfur": "120.00"
    },
    {
      "Name": "150mm",
      "CodeName": "HeavyArtilleryAmmo",
      "Category": "Heavy Ammunition",
      "Goal": "300",
      "Source": "MPF Patridia",
      "BMAT": "660.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "220.00",
      "Salvage": "1,320.00",
      "Components": "0.00",
      "Sulfur": "1,100.00"
    },
    {
      "Name": "68mm",
      "CodeName": "ATAmmo",
      "Category": "Heavy Ammunition",
      "Goal": "200",
      "Source": "MPF Baccae",
      "BMAT": "660.00",
      "EMAT": "660.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "7,920.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Anti-Tank Sticky Bomb",
      "CodeName": "StickyBomb",
      "Category": "Heavy Arms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "275.00",
      "EMAT": "275.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "3,300.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "RPG",
      "CodeName": "RpgAmmo",
      "Category": "Heavy Arms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "330.00",
      "EMAT": "244.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "3,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Shrapnel Mortar Shell",
      "CodeName": "MortarAmmoSH",
      "Category": "Heavy Arms",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "60.00",
      "EMAT": "15.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "270.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Flare Mortar Shell",
      "CodeName": "MortarAmmoFL",
      "Category": "Heavy Arms",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "60.00",
      "EMAT": "10.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "220.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Mortar Shell",
      "CodeName": "MortarAmmo",
      "Category": "Heavy Arms",
      "Goal": "150",
      "Source": "MPF Baccae",
      "BMAT": "330.00",
      "EMAT": "189.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "2,550.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Cremari Mortar",
      "CodeName": "Mortar",
      "Category": "Heavy Arms",
      "Goal": "50",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "",
      "RMAT": "134.00",
      "HEMAT": "",
      "Salvage": "1,100.00",
      "Components": "2,680.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "30mm",
      "CodeName": "MiniTankAmmo",
      "Category": "Heavy Arms",
      "Goal": "100",
      "Source": "Factory",
      "BMAT": "80.00",
      "EMAT": "20.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "360.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Lamentum mm.IV",
      "CodeName": "MGTC",
      "Category": "Heavy Arms",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "",
      "RMAT": "5.00",
      "HEMAT": "",
      "Salvage": "200.00",
      "Components": "100.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Daucus isg.III",
      "CodeName": "ISGTC",
      "Category": "Heavy Arms",
      "Goal": "30",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "",
      "RMAT": "5.00",
      "HEMAT": "",
      "Salvage": "200.00",
      "Components": "100.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Tremola Grenade GPb-1",
      "CodeName": "HELaunchedGrenade",
      "Category": "Heavy Arms",
      "Goal": "300",
      "Source": "MPF Patridia",
      "BMAT": "409.00",
      "EMAT": "275.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "3,568.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Mammon 91-b",
      "CodeName": "HEGrenade",
      "Category": "Heavy Arms",
      "Goal": "100",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "10.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "300.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "KLG901-2 Lunaire F",
      "CodeName": "GrenadeLauncherC",
      "Category": "Heavy Arms",
      "Goal": "150",
      "Source": "MPF Baccae",
      "BMAT": "275.00",
      "EMAT": "",
      "RMAT": "165.00",
      "HEMAT": "",
      "Salvage": "550.00",
      "Components": "3,300.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "ARC/RPG",
      "CodeName": "ATRPGIndirectAmmo",
      "Category": "Heavy Arms",
      "Goal": "50",
      "Source": "MPF Baccae",
      "BMAT": "330.00",
      "EMAT": "409.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "4,750.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Bane 45",
      "CodeName": "ATRPGHeavyC",
      "Category": "Heavy Arms",
      "Goal": "50",
      "Source": "MPF Baccae",
      "BMAT": "825.00",
      "EMAT": "",
      "RMAT": "220.00",
      "HEMAT": "",
      "Salvage": "1,650.00",
      "Components": "4,400.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Venom c.II 35",
      "CodeName": "ATRPGC",
      "Category": "Heavy Arms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "",
      "RMAT": "79.00",
      "HEMAT": "",
      "Salvage": "1,100.00",
      "Components": "1,580.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "AP/RPG",
      "CodeName": "ATRPGAmmo",
      "Category": "Heavy Arms",
      "Goal": "200",
      "Source": "MPF Baccae",
      "BMAT": "330.00",
      "EMAT": "409.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "4,750.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "“Typhon” ra.XII",
      "CodeName": "ATRifleTC",
      "Category": "Heavy Arms",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "",
      "RMAT": "5.00",
      "HEMAT": "",
      "Salvage": "200.00",
      "Components": "100.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "20mm",
      "CodeName": "ATRifleAmmo",
      "Category": "Heavy Arms",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "200.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Trauma Kit",
      "CodeName": "TraumaKit",
      "Category": "Medical",
      "Goal": "100",
      "Source": "Factory",
      "BMAT": "80.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "160.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Soldier Supplies",
      "CodeName": "SoldierSupplies",
      "Category": "Medical",
      "Goal": "500",
      "Source": "Factory",
      "BMAT": "80.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "160.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "First Aid Kit",
      "CodeName": "FirstAidKit",
      "Category": "Medical",
      "Goal": "100",
      "Source": "Factory",
      "BMAT": "60.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "120.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Blood Plasma",
      "CodeName": "BloodPlasma",
      "Category": "Medical",
      "Goal": "100",
      "Source": "Factory",
      "BMAT": "80.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "160.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Bandages",
      "CodeName": "Bandages",
      "Category": "Medical",
      "Goal": "100",
      "Source": "Factory",
      "BMAT": "80.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "160.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Refined Materials",
      "CodeName": "Wood",
      "Category": "Resource",
      "Goal": "300",
      "Source": "Refinery",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "",
      "Components": "400",
      "Sulfur": ""
    },
    {
      "Name": "Maintenance Supplies",
      "CodeName": "MaintenanceSupplies",
      "Category": "Resource",
      "Goal": "300",
      "Source": "MPF Baccae",
      "BMAT": "1,375.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "2,750.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Heavy Explosive Powder",
      "CodeName": "HeavyExplosive",
      "Category": "Resource",
      "Goal": "300",
      "Source": "Refinery",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "",
      "Components": "",
      "Sulfur": "150"
    },
    {
      "Name": "Explosive Powder",
      "CodeName": "Explosive",
      "Category": "Resource",
      "Goal": "300",
      "Source": "Refinery",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "200",
      "Components": "",
      "Sulfur": ""
    },
    {
      "Name": "Basic Materials",
      "CodeName": "Cloth",
      "Category": "Resource",
      "Goal": "600",
      "Source": "Refinery",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "200",
      "Components": "",
      "Sulfur": ""
    },
    {
      "Name": "PT-815 Smoke Grenade",
      "CodeName": "SmokeGrenade",
      "Category": "Small Arms",
      "Goal": "100",
      "Source": "Factory",
      "BMAT": "120.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "240.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "“Lionclaw” mc.VIII",
      "CodeName": "SMGHeavyC",
      "Category": "Small Arms",
      "Goal": "200",
      "Source": "Factory",
      "BMAT": "120.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "240.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "“The Pitch Gun” mc.V",
      "CodeName": "SMGC",
      "Category": "Small Arms",
      "Goal": "20",
      "Source": "Factory",
      "BMAT": "80.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "160.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "9mm",
      "CodeName": "SMGAmmo",
      "Category": "Small Arms",
      "Goal": "200",
      "Source": "Factory",
      "BMAT": "80.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "160.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Argenti r.II Rifle",
      "CodeName": "RifleC",
      "Category": "Small Arms",
      "Goal": "200",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "200.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "7.62mm",
      "CodeName": "RifleAmmo",
      "Category": "Small Arms",
      "Goal": "200",
      "Source": "Factory",
      "BMAT": "80.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "160.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "KRN886-127 Gast Machine Gun",
      "CodeName": "MGC",
      "Category": "Small Arms",
      "Goal": "50",
      "Source": "MPF Baccae",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "134.00",
      "HEMAT": "",
      "Salvage": "0.00",
      "Components": "2,680.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "12.7mm",
      "CodeName": "MGAmmo",
      "Category": "Small Arms",
      "Goal": "150",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "200.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Bomastone Grenade",
      "CodeName": "GrenadeC",
      "Category": "Small Arms",
      "Goal": "300",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "110.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "2,200.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Green Ash Grenade",
      "CodeName": "GreenAsh",
      "Category": "Small Arms",
      "Goal": "200",
      "Source": "MPF Baccae",
      "BMAT": "770.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,540.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "“Dusk” ce.III",
      "CodeName": "AssaultRifleHeavyC",
      "Category": "Small Arms",
      "Goal": "150",
      "Source": "MPF Baccae",
      "BMAT": "904.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,808.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Catara mo.II",
      "CodeName": "AssaultRifleC",
      "Category": "Small Arms",
      "Goal": "150",
      "Source": "MPF Baccae",
      "BMAT": "904.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,808.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "7.92mm",
      "CodeName": "AssaultRifleAmmo",
      "Category": "Small Arms",
      "Goal": "200",
      "Source": "Factory",
      "BMAT": "120.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "240.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "DAE 1b-2 “Serra”",
      "CodeName": "EmplacedInfantryC",
      "Category": "Structures",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "1,050.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "2,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "DAE 1o-3 “Polybolos”",
      "CodeName": "EmplacedIndirectC",
      "Category": "Structures",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "1,311.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "2,622.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "50-500 “Thunderbolt” Cannon",
      "CodeName": "EmplacedHeavyArtilleryC",
      "Category": "Structures",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "2,046.00",
      "HEMAT": "",
      "Salvage": "0.00",
      "Components": "40,920.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Tankman’s Coveralls",
      "CodeName": "TankUniformC",
      "Category": "Uniforms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Heavy Topcoat",
      "CodeName": "SnowUniformC",
      "Category": "Uniforms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Recon Camo",
      "CodeName": "ScoutUniformC",
      "Category": "Uniforms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Legionary’s Oilcoat",
      "CodeName": "RainUniformC",
      "Category": "Uniforms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Medic Fatigues",
      "CodeName": "MedicUniformC",
      "Category": "Uniforms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Grenadier’s Baldric",
      "CodeName": "GrenadeUniformC",
      "Category": "Uniforms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Fabri Rucksack",
      "CodeName": "EngineerUniformC",
      "Category": "Uniforms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Velian Flak Vest",
      "CodeName": "ArmourUniformC",
      "Category": "Uniforms",
      "Goal": "100",
      "Source": "MPF Baccae",
      "BMAT": "550.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "1,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Wrench",
      "CodeName": "WorkWrench",
      "Category": "Utility",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "75.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "150.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Tripod",
      "CodeName": "Tripod",
      "Category": "Utility",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "200.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Abisme AT-99",
      "CodeName": "TankMine",
      "Category": "Utility",
      "Goal": "100",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "10.00",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "300.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Shovel",
      "CodeName": "Shovel",
      "Category": "Utility",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "200.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "400.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Havoc Charge Detonator",
      "CodeName": "SatchelChargeT",
      "Category": "Utility",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "75.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "20.00",
      "Salvage": "150.00",
      "Components": "0.00",
      "Sulfur": "100.00"
    },
    {
      "Name": "Radio",
      "CodeName": "Radio",
      "Category": "Utility",
      "Goal": "175",
      "Source": "Factory",
      "BMAT": "75.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "150.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Listening Kit",
      "CodeName": "ListeningKit",
      "Category": "Utility",
      "Goal": "30",
      "Source": "Factory",
      "BMAT": "150.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "300.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Gas Mask Filter",
      "CodeName": "GasMaskFilter",
      "Category": "Utility",
      "Goal": "200",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "200.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Gas Mask",
      "CodeName": "GasMask",
      "Category": "Utility",
      "Goal": "150",
      "Source": "Factory",
      "BMAT": "160.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "320.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "“Molten Wind” v.II Ammo",
      "CodeName": "FlameBackpackC",
      "Category": "Utility",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "160.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "20.00",
      "Salvage": "320.00",
      "Components": "0.00",
      "Sulfur": "100.00"
    },
    {
      "Name": "Havoc Charge",
      "CodeName": "ExplosiveTripod",
      "Category": "Utility",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "75.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "40.00",
      "Salvage": "150.00",
      "Components": "0.00",
      "Sulfur": "200.00"
    },
    {
      "Name": "Hydra’s Whisper",
      "CodeName": "ExplosiveLightC",
      "Category": "Utility",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "100.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "40.00",
      "Salvage": "200.00",
      "Components": "0.00",
      "Sulfur": "200.00"
    },
    {
      "Name": "Binoculars",
      "CodeName": "Binoculars",
      "Category": "Utility",
      "Goal": "50",
      "Source": "Factory",
      "BMAT": "75.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "150.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "Buckhorn CCQ-18",
      "CodeName": "Bayonet",
      "Category": "Utility",
      "Goal": "100",
      "Source": "Factory",
      "BMAT": "40.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "80.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "R-1 Hauler",
      "CodeName": "TruckC",
      "Category": "Vehicles",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "1,050.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "2,100.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "UV-05a “Argonaut”",
      "CodeName": "ScoutVehicleMobilityC",
      "Category": "Vehicles",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "105.00",
      "HEMAT": "",
      "Salvage": "0.00",
      "Components": "2,100.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "85K-b “Falchion”",
      "CodeName": "MediumTankC",
      "Category": "Vehicles",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "1,416.00",
      "HEMAT": "",
      "Salvage": "0.00",
      "Components": "28,320.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "86K-a “Bardiche”",
      "CodeName": "MediumTank2C",
      "Category": "Vehicles",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "1,731.00",
      "HEMAT": "",
      "Salvage": "0.00",
      "Components": "34,620.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "120-68 “Koronides” Field Gun",
      "CodeName": "LargeFieldLightArtilleryC",
      "Category": "Vehicles",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "525.00",
      "HEMAT": "",
      "Salvage": "0.00",
      "Components": "10,500.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "BMS - Packmule Flatbed",
      "CodeName": "FlatbedTruck",
      "Category": "Vehicles",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "315.00",
      "HEMAT": "",
      "Salvage": "0.00",
      "Components": "6,300.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "AA-2 \"Battering Ram\"",
      "CodeName": "FieldATC",
      "Category": "Vehicles",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "210.00",
      "HEMAT": "",
      "Salvage": "0.00",
      "Components": "4,200.00",
      "Sulfur": "0.00"
    },
    {
      "Name": "R-12b - “Salva” Flame Truck",
      "CodeName": "AmbulanceFlameC",
      "Category": "Vehicles",
      "Goal": "10",
      "Source": "Facility",
      "BMAT": "",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "",
      "Components": "",
      "Sulfur": ""
    },
    {
      "Name": "R-12 - “Salus” Ambulance",
      "CodeName": "AmbulanceC",
      "Category": "Vehicles",
      "Goal": "10",
      "Source": "MPF Baccae",
      "BMAT": "1,575.00",
      "EMAT": "",
      "RMAT": "",
      "HEMAT": "",
      "Salvage": "3,150.00",
      "Components": "0.00",
      "Sulfur": "0.00"
    }
  ];