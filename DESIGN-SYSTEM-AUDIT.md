# Design-system audit — context-aware hardcoded-color worklist

Read-only inventory. Each hex literal in `src/**` is classified by its **actual syntactic context** (parsed, not bare-grepped) and checked against the token values in `src/tokens.css`.

## Category legend

| Category | Meaning | Action |
|---|---|---|
| `raw CSS value` | bare `prop: #hex` in a .css file that equals a token | **safe replace** → `var(--token)` |
| `raw inline style` | `#hex` in a JSX `style={{…}}` string that equals a token | **safe replace** → `var(--token)` |
| `new-token candidate` | raw value with **no** matching token | design decision: add token or leave |
| `SVG attribute` | `fill=/stroke="#hex"` — `var()` invalid here | refactor attr → `style`, not find-replace |
| `white/ambiguous` | `#fff`/`#ffffff` — many meanings | review case-by-case |
| `already-tokenized fallback` | hex is the fallback inside `var(--t, #hex)` | **already cascades — leave** |
| `Shortlist exception` | lives in a `Shortlist.*` file (independent product) | **leave** |

## Summary by category

| Category | Count |
|---|---|
| raw CSS value | 0 |
| raw inline style | 0 |
| new-token candidate | 363 |
| SVG attribute | 13 |
| white/ambiguous | 31 |
| already-tokenized fallback | 11 |
| Shortlist exception | 47 |
| **Total** | **465** |

## Safe-replace worklist by file (raw CSS value + raw inline style, single-token)

| File | Safe replacements |
|---|---|

## Per-file detail

### `src/pages/About.jsx`  — 1 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 146 | `#fff` | already-tokenized fallback | --surface |  |

### `src/pages/Bits.jsx`  — 7 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 191 | `#1A1F2E` | new-token candidate |  |  |
| 207 | `#242B3D` | new-token candidate |  |  |
| 218 | `#E8E0D0` | new-token candidate |  |  |
| 224 | `#E8E0D0` | new-token candidate |  |  |
| 225 | `#8FA5BF` | new-token candidate |  |  |
| 226 | `#E8E0D0` | new-token candidate |  |  |
| 304 | `#C04040` | new-token candidate |  |  |

### `src/pages/CaseStudy.css`  — 2 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 11 | `#3d4f63` | new-token candidate |  |  |
| 88 | `#3d5080` | new-token candidate |  |  |

### `src/pages/CaseStudy.jsx`  — 76 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 7 | `#3d4f63` | new-token candidate |  |  |
| 11 | `#5a9e7c` | new-token candidate |  |  |
| 80 | `#2d3e50` | new-token candidate |  |  |
| 187 | `#2d3e50` | new-token candidate |  |  |
| 213 | `#90a1b9` | new-token candidate |  |  |
| 224 | `#a0906e` | new-token candidate |  |  |
| 235 | `#b17c5d` | new-token candidate |  |  |
| 246 | `#b17c5d` | new-token candidate |  |  |
| 257 | `#6a81b2` | new-token candidate |  |  |
| 321 | `#90a1b9` | SVG attribute |  |  |
| 332 | `#90a1b9` | new-token candidate |  |  |
| 374 | `#c27070` | new-token candidate |  |  |
| 393 | `#3d4f63` | new-token candidate |  |  |
| 511 | `#2d3e50` | new-token candidate |  |  |
| 602 | `#2d3e50` | new-token candidate |  |  |
| 648 | `#2d3e50` | new-token candidate |  |  |
| 751 | `#222f3e` | new-token candidate |  |  |
| 996 | `#1a2744` | new-token candidate |  |  |
| 1005 | `#f4f5f7` | new-token candidate |  |  |
| 1007 | `#1a2744` | new-token candidate |  |  |
| 1017 | `#6b7a99` | new-token candidate |  |  |
| 1018 | `#1a2744` | new-token candidate |  |  |
| 1021 | `#6b7a99` | new-token candidate |  |  |
| 1022 | `#4caf7d` | new-token candidate |  |  |
| 1023 | `#4caf7d` | new-token candidate |  |  |
| 1029 | `#fff` | white/ambiguous | --surface |  |
| 1029 | `#e2e6ef` | new-token candidate |  |  |
| 1030 | `#6b7a99` | new-token candidate |  |  |
| 1033 | `#6b7a99` | new-token candidate |  |  |
| 1034 | `#f4f5f7` | new-token candidate |  |  |
| 1034 | `#dde2ef` | new-token candidate |  |  |
| 1034 | `#1a2744` | new-token candidate |  |  |
| 1038 | `#e8f5ee` | new-token candidate |  |  |
| 1038 | `#4caf7d` | new-token candidate |  |  |
| 1038 | `#2d7a52` | new-token candidate |  |  |
| 1039 | `#f4f5f7` | new-token candidate |  |  |
| 1039 | `#dde2ef` | new-token candidate |  |  |
| 1039 | `#9aa3b8` | new-token candidate |  |  |
| 1044 | `#6b7a99` | new-token candidate |  |  |
| 1045 | `#fff` | white/ambiguous | --surface |  |
| 1045 | `#4a7cdc` | new-token candidate |  |  |
| 1045 | `#1a2744` | new-token candidate |  |  |
| 1048 | `#6b7a99` | new-token candidate |  |  |
| 1049 | `#f4f5f7` | new-token candidate |  |  |
| 1049 | `#dde2ef` | new-token candidate |  |  |
| 1049 | `#1a2744` | new-token candidate |  |  |
| 1054 | `#6b7a99` | new-token candidate |  |  |
| 1055 | `#f4f5f7` | new-token candidate |  |  |
| 1055 | `#dde2ef` | new-token candidate |  |  |
| 1055 | `#1a2744` | new-token candidate |  |  |
| 1059 | `#fff` | white/ambiguous | --surface |  |
| 1059 | `#dde2ef` | new-token candidate |  |  |
| 1059 | `#6b7a99` | new-token candidate |  |  |
| 1060 | `#4a7cdc` | new-token candidate |  |  |
| 1060 | `#fff` | white/ambiguous | --surface |  |
| 1064 | `#fff` | white/ambiguous | --surface |  |
| 1064 | `#e2e6ef` | new-token candidate |  |  |
| 1065 | `#f0f2f7` | new-token candidate |  |  |
| 1066 | `#1a2744` | new-token candidate |  |  |
| 1067 | `#f5b731` | new-token candidate |  |  |
| 1070 | `#f0f2f7` | new-token candidate |  |  |
| 1072 | `#9aa3b8` | new-token candidate |  |  |
| 1084 | `#f7f8fb` | new-token candidate |  |  |
| 1084 | `#f0f4ff` | new-token candidate |  |  |
| 1084 | `#fff` | white/ambiguous | --surface |  |
| 1085 | `#4a7cdc` | new-token candidate |  |  |
| 1085 | `#1a2744` | new-token candidate |  |  |
| 1086 | `#6b7a99` | new-token candidate |  |  |
| 1087 | `#2d7a52` | new-token candidate |  |  |
| 1087 | `#c0392b` | new-token candidate |  |  |
| 1165 | `#F5C518` | SVG attribute |  |  |
| 1166 | `#7a5c00` | SVG attribute |  |  |
| 1167 | `#7a5c00` | SVG attribute |  |  |
| 1612 | `#9E644B` | SVG attribute | --clay |  |
| 1617 | `#9E644B` | SVG attribute | --clay |  |
| 1622 | `#9E644B` | SVG attribute | --clay |  |

### `src/pages/ColorPreview.jsx`  — 20 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 4 | `#8C8958` | new-token candidate |  |  |
| 5 | `#59573B` | new-token candidate |  |  |
| 8 | `#4A4540` | new-token candidate |  |  |
| 9 | `#5C5A3E` | new-token candidate |  |  |
| 10 | `#F3F1EE` | new-token candidate |  |  |
| 11 | `#FAF9F6` | new-token candidate |  |  |
| 12 | `#D6A180` | new-token candidate |  |  |
| 14 | `#241D15` | new-token candidate |  |  |
| 42 | `#8B5E3C` | new-token candidate |  |  |
| 77 | `#5a9e7c` | new-token candidate |  |  |
| 77 | `#c27070` | new-token candidate |  |  |
| 128 | `#E8E6DF` | new-token candidate |  |  |
| 140 | `#8B5E3C` | new-token candidate |  |  |
| 176 | `#8B5E3C` | new-token candidate |  |  |
| 199 | `#E8E6DF` | new-token candidate |  |  |
| 204 | `#F3F1EE` | new-token candidate |  |  |
| 205 | `#8C8958` | new-token candidate |  |  |
| 206 | `#59573B` | new-token candidate |  |  |
| 207 | `#D6A180` | new-token candidate |  |  |
| 208 | `#241D15` | new-token candidate |  |  |

### `src/pages/Home.module.css`  — 8 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 78 | `#3D3322` | new-token candidate |  |  |
| 122 | `#FEFDFB` | new-token candidate |  |  |
| 162 | `#5F7A9A` | new-token candidate |  |  |
| 183 | `#5F7A9A` | new-token candidate |  |  |
| 191 | `#5C4E2E` | new-token candidate |  |  |
| 198 | `#5F7A9A` | new-token candidate |  |  |
| 207 | `#8A6F44` | new-token candidate |  |  |
| 344 | `#2A1F08` | new-token candidate |  |  |

### `src/pages/Illustrations.jsx`  — 12 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 239 | `#F3A3CA` | new-token candidate |  |  |
| 253 | `#FAFCE1` | new-token candidate |  |  |
| 266 | `#FFF1F1` | new-token candidate |  |  |
| 278 | `#FAFFFE` | new-token candidate |  |  |
| 328 | `#858DA3` | new-token candidate |  |  |
| 331 | `#FFF7E5` | new-token candidate |  |  |
| 357 | `#FFFEF5` | new-token candidate |  |  |
| 395 | `#4373ED` | new-token candidate |  |  |
| 395 | `#FFFEF5` | new-token candidate |  |  |
| 437 | `#FFECB9` | new-token candidate |  |  |
| 449 | `#344A53` | new-token candidate |  |  |
| 470 | `#F6F6FB` | new-token candidate |  |  |

### `src/pages/OrderManagementCaseStudy.css`  — 20 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 43 | `#9E644B` | already-tokenized fallback | --clay |  |
| 60 | `#9E644B` | already-tokenized fallback | --clay |  |
| 76 | `#f0ebe3` | new-token candidate |  |  |
| 76 | `#e8dfd5` | new-token candidate |  |  |
| 84 | `#2a231b` | new-token candidate |  |  |
| 84 | `#1e1812` | new-token candidate |  |  |
| 283 | `#7b8ea8` | new-token candidate |  |  |
| 290 | `#e8edf2` | new-token candidate |  |  |
| 317 | `#fbfaf4` | new-token candidate |  |  |
| 331 | `#fff` | white/ambiguous | --surface |  |
| 363 | `#fff` | white/ambiguous | --surface |  |
| 390 | `#fff` | white/ambiguous | --surface |  |
| 403 | `#fff` | white/ambiguous | --surface |  |
| 410 | `#fff` | white/ambiguous | --surface |  |
| 412 | `#fff` | white/ambiguous | --surface |  |
| 430 | `#fff` | white/ambiguous | --surface |  |
| 485 | `#fff` | white/ambiguous | --surface |  |
| 499 | `#fbfaf4` | new-token candidate |  |  |
| 521 | `#fbfaf4` | new-token candidate |  |  |
| 557 | `#B86757` | new-token candidate |  |  |

### `src/pages/OrderManagementCaseStudy.jsx`  — 7 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 148 | `#fff` | white/ambiguous | --surface |  |
| 149 | `#1a1a1a` | new-token candidate |  |  |
| 149 | `#fff` | white/ambiguous | --surface |  |
| 167 | `#fff` | white/ambiguous | --surface |  |
| 203 | `#000` | new-token candidate |  |  |
| 213 | `#fff` | white/ambiguous | --surface |  |
| 245 | `#F6F6F1` | new-token candidate |  |  |

### `src/pages/RulesCaseStudy.jsx`  — 255 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 8 | `#edeef0` | new-token candidate |  |  |
| 40 | `#f5f0eb` | new-token candidate |  |  |
| 40 | `#ede8e3` | new-token candidate |  |  |
| 40 | `#ededee` | new-token candidate |  |  |
| 40 | `#dde1e5` | new-token candidate |  |  |
| 76 | `#fff` | white/ambiguous | --surface |  |
| 105 | `#fff` | white/ambiguous | --surface |  |
| 106 | `#f0f0f0` | new-token candidate |  |  |
| 109 | `#5cb176` | new-token candidate |  |  |
| 125 | `#5cb176` | new-token candidate |  |  |
| 125 | `#fff` | white/ambiguous | --surface |  |
| 165 | `#fff` | white/ambiguous | --surface |  |
| 189 | `#5cb176` | new-token candidate |  |  |
| 282 | `#5cb176` | new-token candidate |  |  |
| 282 | `#fff` | white/ambiguous | --surface |  |
| 293 | `#9bbf7a` | new-token candidate |  |  |
| 293 | `#e8b84b` | new-token candidate |  |  |
| 293 | `#8aafc4` | new-token candidate |  |  |
| 293 | `#cc7a58` | new-token candidate |  |  |
| 293 | `#c9a090` | new-token candidate |  |  |
| 294 | `#1a3d12` | new-token candidate |  |  |
| 294 | `#3d2800` | new-token candidate |  |  |
| 294 | `#0a2540` | new-token candidate |  |  |
| 294 | `#3d0a00` | new-token candidate |  |  |
| 294 | `#3d0028` | new-token candidate |  |  |
| 391 | `#FFFFFD` | new-token candidate |  |  |
| 405 | `#b07a30` | new-token candidate |  |  |
| 405 | `#b07a30` | new-token candidate |  |  |
| 434 | `#4a6378` | new-token candidate |  |  |
| 439 | `#4a6378` | new-token candidate |  |  |
| 455 | `#4a6378` | new-token candidate |  |  |
| 456 | `#4a6378` | new-token candidate |  |  |
| 464 | `#4a6378` | new-token candidate |  |  |
| 469 | `#4a6378` | new-token candidate |  |  |
| 499 | `#5F7A9A` | new-token candidate |  |  |
| 499 | `#6a81b2` | new-token candidate |  |  |
| 504 | `#4a6378` | new-token candidate |  |  |
| 507 | `#4a6378` | new-token candidate |  |  |
| 514 | `#3d5377` | new-token candidate |  |  |
| 515 | `#2d6c44` | new-token candidate |  |  |
| 516 | `#9a6420` | new-token candidate |  |  |
| 526 | `#4a6378` | new-token candidate |  |  |
| 526 | `#8a9aaa` | new-token candidate |  |  |
| 527 | `#9a7420` | new-token candidate |  |  |
| 527 | `#d4a843` | new-token candidate |  |  |
| 528 | `#2e7396` | new-token candidate |  |  |
| 528 | `#5b9fc8` | new-token candidate |  |  |
| 531 | `#FFFFFD` | new-token candidate |  |  |
| 633 | `#8644` | new-token candidate |  |  |
| 647 | `#FBF9F4` | new-token candidate |  |  |
| 684 | `#FBF9F4` | new-token candidate |  |  |
| 770 | `#fff` | white/ambiguous | --surface |  |
| 866 | `#fff` | white/ambiguous | --surface |  |
| 909 | `#fff` | white/ambiguous | --surface |  |
| 956 | `#b8b8b8` | new-token candidate |  |  |
| 957 | `#d4e0ec` | new-token candidate |  |  |
| 957 | `#a0b8cc` | new-token candidate |  |  |
| 957 | `#1a1a1a` | new-token candidate |  |  |
| 958 | `#e8e8e8` | new-token candidate |  |  |
| 958 | `#ccc` | new-token candidate |  |  |
| 959 | `#333` | new-token candidate |  |  |
| 959 | `#ccc` | new-token candidate |  |  |
| 962 | `#fffbcc` | new-token candidate |  |  |
| 962 | `#fff` | white/ambiguous | --surface |  |
| 962 | `#fafafa` | new-token candidate |  |  |
| 962 | `#f0f0f0` | new-token candidate |  |  |
| 963 | `#2563eb` | new-token candidate |  |  |
| 963 | `#eee` | new-token candidate |  |  |
| 964 | `#333` | new-token candidate |  |  |
| 964 | `#eee` | new-token candidate |  |  |
| 964 | `#fdee73` | new-token candidate |  |  |
| 965 | `#555` | new-token candidate |  |  |
| 965 | `#eee` | new-token candidate |  |  |
| 966 | `#888` | new-token candidate |  |  |
| 969 | `#aaa` | new-token candidate |  |  |
| 969 | `#eee` | new-token candidate |  |  |
| 981 | `#b8b8b8` | new-token candidate |  |  |
| 982 | `#d4e0ec` | new-token candidate |  |  |
| 982 | `#a0b8cc` | new-token candidate |  |  |
| 982 | `#1a1a1a` | new-token candidate |  |  |
| 983 | `#555` | new-token candidate |  |  |
| 983 | `#f5f5f5` | new-token candidate |  |  |
| 983 | `#e8e8e8` | new-token candidate |  |  |
| 985 | `#333` | new-token candidate |  |  |
| 985 | `#f0f0f0` | new-token candidate |  |  |
| 986 | `#999` | new-token candidate |  |  |
| 990 | `#fafafa` | new-token candidate |  |  |
| 990 | `#eee` | new-token candidate |  |  |
| 991 | `#aaa` | new-token candidate |  |  |
| 991 | `#f0f0f0` | new-token candidate |  |  |
| 992 | `#aaa` | new-token candidate |  |  |
| 992 | `#d4e0ec` | new-token candidate |  |  |
| 1005 | `#b8b8b8` | new-token candidate |  |  |
| 1006 | `#d4e0ec` | new-token candidate |  |  |
| 1006 | `#a0b8cc` | new-token candidate |  |  |
| 1006 | `#1a1a1a` | new-token candidate |  |  |
| 1007 | `#eee` | new-token candidate |  |  |
| 1008 | `#555` | new-token candidate |  |  |
| 1008 | `#c00` | new-token candidate |  |  |
| 1010 | `#aaa` | new-token candidate |  |  |
| 1010 | `#333` | new-token candidate |  |  |
| 1011 | `#aaa` | new-token candidate |  |  |
| 1011 | `#888` | new-token candidate |  |  |
| 1014 | `#eee` | new-token candidate |  |  |
| 1015 | `#555` | new-token candidate |  |  |
| 1015 | `#c00` | new-token candidate |  |  |
| 1017 | `#aaa` | new-token candidate |  |  |
| 1018 | `#aaa` | new-token candidate |  |  |
| 1021 | `#fafafa` | new-token candidate |  |  |
| 1022 | `#aaa` | new-token candidate |  |  |
| 1022 | `#f0f0f0` | new-token candidate |  |  |
| 1023 | `#aaa` | new-token candidate |  |  |
| 1023 | `#d4e0ec` | new-token candidate |  |  |
| 1037 | `#b8b8b8` | new-token candidate |  |  |
| 1038 | `#d4e0ec` | new-token candidate |  |  |
| 1038 | `#1a1a1a` | new-token candidate |  |  |
| 1040 | `#555` | new-token candidate |  |  |
| 1040 | `#f0f0f0` | new-token candidate |  |  |
| 1042 | `#aaa` | new-token candidate |  |  |
| 1044 | `#9ba8b8` | new-token candidate |  |  |
| 1045 | `#b0b0b0` | new-token candidate |  |  |
| 1046 | `#1d6b38` | new-token candidate |  |  |
| 1047 | `#e8e8e8` | new-token candidate |  |  |
| 1047 | `#bbb` | new-token candidate |  |  |
| 1048 | `#444` | new-token candidate |  |  |
| 1048 | `#ccc` | new-token candidate |  |  |
| 1051 | `#fff` | white/ambiguous | --surface |  |
| 1051 | `#f7f7f7` | new-token candidate |  |  |
| 1051 | `#eee` | new-token candidate |  |  |
| 1052 | `#999` | new-token candidate |  |  |
| 1052 | `#f0f0f0` | new-token candidate |  |  |
| 1052 | `#ddd` | new-token candidate |  |  |
| 1053 | `#2563eb` | new-token candidate |  |  |
| 1053 | `#eee` | new-token candidate |  |  |
| 1054 | `#555` | new-token candidate |  |  |
| 1054 | `#eee` | new-token candidate |  |  |
| 1055 | `#888` | new-token candidate |  |  |
| 1058 | `#aaa` | new-token candidate |  |  |
| 1058 | `#eee` | new-token candidate |  |  |
| 1072 | `#b8b8b8` | new-token candidate |  |  |
| 1073 | `#3a4553` | new-token candidate |  |  |
| 1081 | `#1a1a1a` | new-token candidate |  |  |
| 1082 | `#eee` | new-token candidate |  |  |
| 1388 | `#222` | new-token candidate |  |  |
| 1388 | `#ddd` | new-token candidate |  |  |
| 1394 | `#b4c8dc` | new-token candidate |  |  |
| 1394 | `#7a96ae` | new-token candidate |  |  |
| 1415 | `#fff` | white/ambiguous | --surface |  |
| 1415 | `#fafafa` | new-token candidate |  |  |
| 1416 | `#c4d0dc` | new-token candidate |  |  |
| 1416 | `#0000cc` | new-token candidate |  |  |
| 1417 | `#c4d0dc` | new-token candidate |  |  |
| 1418 | `#c4d0dc` | new-token candidate |  |  |
| 1420 | `#c4d0dc` | new-token candidate |  |  |
| 1421 | `#2a7a2a` | SVG attribute |  |  |
| 1424 | `#c4d0dc` | new-token candidate |  |  |
| 1424 | `#333` | new-token candidate |  |  |
| 1479 | `#3d3530` | new-token candidate |  |  |
| 1485 | `#3d3530` | new-token candidate |  |  |
| 1494 | `#3d3530` | new-token candidate |  |  |
| 1495 | `#3d3530` | new-token candidate |  |  |
| 1496 | `#3d3530` | new-token candidate |  |  |
| 1503 | `#3d3530` | new-token candidate |  |  |
| 1511 | `#3d3530` | new-token candidate |  |  |
| 1512 | `#3d3530` | new-token candidate |  |  |
| 1513 | `#3d3530` | new-token candidate |  |  |
| 1520 | `#3d3530` | new-token candidate |  |  |
| 1527 | `#3d3530` | new-token candidate |  |  |
| 1528 | `#3d3530` | new-token candidate |  |  |
| 1529 | `#3d3530` | new-token candidate |  |  |
| 1536 | `#3d3530` | new-token candidate |  |  |
| 1542 | `#3d3530` | new-token candidate |  |  |
| 1543 | `#3d3530` | new-token candidate |  |  |
| 1544 | `#3d3530` | new-token candidate |  |  |
| 1551 | `#3d3530` | new-token candidate |  |  |
| 1599 | `#f7f6f2` | new-token candidate |  |  |
| 1612 | `#b8b8b8` | new-token candidate |  |  |
| 1613 | `#d4e0ec` | new-token candidate |  |  |
| 1613 | `#a0b8cc` | new-token candidate |  |  |
| 1613 | `#1a1a1a` | new-token candidate |  |  |
| 1616 | `#cc0000` | new-token candidate |  |  |
| 1618 | `#333` | new-token candidate |  |  |
| 1620 | `#aaa` | new-token candidate |  |  |
| 1620 | `#f0f0f0` | new-token candidate |  |  |
| 1620 | `#333` | new-token candidate |  |  |
| 1621 | `#888` | new-token candidate |  |  |
| 1626 | `#cc0000` | new-token candidate |  |  |
| 1627 | `#333` | new-token candidate |  |  |
| 1628 | `#aaa` | new-token candidate |  |  |
| 1628 | `#0a246a` | new-token candidate |  |  |
| 1628 | `#333` | new-token candidate |  |  |
| 1629 | `#aaa` | new-token candidate |  |  |
| 1629 | `#333` | new-token candidate |  |  |
| 1632 | `#cc0000` | new-token candidate |  |  |
| 1633 | `#333` | new-token candidate |  |  |
| 1636 | `#aaa` | new-token candidate |  |  |
| 1636 | `#333` | new-token candidate |  |  |
| 1636 | `#f0f0f0` | new-token candidate |  |  |
| 1647 | `#bbb` | new-token candidate |  |  |
| 1648 | `#1d6f42` | new-token candidate |  |  |
| 1649 | `#1d6f42` | new-token candidate |  |  |
| 1652 | `#f3f3f3` | new-token candidate |  |  |
| 1652 | `#ddd` | new-token candidate |  |  |
| 1653 | `#555` | new-token candidate |  |  |
| 1653 | `#ddd` | new-token candidate |  |  |
| 1655 | `#eee` | new-token candidate |  |  |
| 1656 | `#888` | new-token candidate |  |  |
| 1656 | `#ddd` | new-token candidate |  |  |
| 1656 | `#f3f3f3` | new-token candidate |  |  |
| 1658 | `#1d6f42` | new-token candidate |  |  |
| 1658 | `#333` | new-token candidate |  |  |
| 1658 | `#eee` | new-token candidate |  |  |
| 1662 | `#f0f0f0` | new-token candidate |  |  |
| 1663 | `#888` | new-token candidate |  |  |
| 1663 | `#ddd` | new-token candidate |  |  |
| 1663 | `#f3f3f3` | new-token candidate |  |  |
| 1664 | `#f0f0f0` | new-token candidate |  |  |
| 1687 | `#b8b8b8` | new-token candidate |  |  |
| 1688 | `#d4e0ec` | new-token candidate |  |  |
| 1688 | `#a0b8cc` | new-token candidate |  |  |
| 1688 | `#1a1a1a` | new-token candidate |  |  |
| 1691 | `#555` | new-token candidate |  |  |
| 1693 | `#555` | new-token candidate |  |  |
| 1694 | `#f5a623` | new-token candidate |  |  |
| 1694 | `#000` | new-token candidate |  |  |
| 1698 | `#555` | new-token candidate |  |  |
| 1699 | `#333` | new-token candidate |  |  |
| 1700 | `#555` | new-token candidate |  |  |
| 1701 | `#aaa` | new-token candidate |  |  |
| 1701 | `#333` | new-token candidate |  |  |
| 1703 | `#555` | new-token candidate |  |  |
| 1707 | `#aaa` | new-token candidate |  |  |
| 1707 | `#dce8f5` | new-token candidate |  |  |
| 1708 | `#1a3a6a` | new-token candidate |  |  |
| 1716 | `#aaa` | new-token candidate |  |  |
| 1716 | `#333` | new-token candidate |  |  |
| 1716 | `#f0f0f0` | new-token candidate |  |  |
| 1734 | `#23283a` | new-token candidate |  |  |
| 1737 | `#ff5f57` | new-token candidate |  |  |
| 1738 | `#febc2e` | new-token candidate |  |  |
| 1739 | `#28c840` | new-token candidate |  |  |
| 1747 | `#6B8EBF` | new-token candidate |  |  |
| 1761 | `#d4a843` | new-token candidate |  |  |
| 1765 | `#23283a` | new-token candidate |  |  |
| 1768 | `#ff5f57` | new-token candidate |  |  |
| 1769 | `#febc2e` | new-token candidate |  |  |
| 1770 | `#28c840` | new-token candidate |  |  |
| 1784 | `#7ab8d4` | new-token candidate |  |  |
| 1784 | `#7ab8d4` | new-token candidate |  |  |
| 1793 | `#7ab8d4` | new-token candidate |  |  |
| 1931 | `#5a5a42` | SVG attribute |  |  |
| 1931 | `#ededee` | SVG attribute |  |  |
| 1931 | `#5a5a42` | SVG attribute |  |  |
| 1931 | `#5a5a42` | SVG attribute |  |  |
| 1931 | `#ededee` | SVG attribute |  |  |

### `src/pages/Shortlist.css`  — 16 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 15 | `#372B0B` | Shortlist exception | --ink-2 |  |
| 153 | `#925641` | Shortlist exception |  |  |
| 246 | `#08080c` | Shortlist exception |  |  |
| 254 | `#08080c` | Shortlist exception |  |  |
| 370 | `#E07840` | Shortlist exception |  |  |
| 408 | `#F3F0E9` | Shortlist exception |  |  |
| 409 | `#F3F0E9` | Shortlist exception |  |  |
| 411 | `#080604` | Shortlist exception |  |  |
| 412 | `#080604` | Shortlist exception |  |  |
| 413 | `#F0EBE2` | Shortlist exception |  |  |
| 415 | `#cfc8bd` | Shortlist exception |  |  |
| 416 | `#8f877b` | Shortlist exception |  |  |
| 433 | `#E07840` | Shortlist exception |  |  |
| 439 | `#fff` | Shortlist exception | --surface |  |
| 442 | `#fff` | Shortlist exception | --surface |  |
| 442 | `#E07840` | Shortlist exception |  |  |

### `src/pages/Shortlist.jsx`  — 21 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 213 | `#E07840` | Shortlist exception |  |  |
| 214 | `#E07840` | Shortlist exception |  |  |
| 218 | `#b05828` | Shortlist exception |  |  |
| 218 | `#4d7a3c` | Shortlist exception |  |  |
| 218 | `#5a4a80` | Shortlist exception |  |  |
| 218 | `#4f6a72` | Shortlist exception |  |  |
| 218 | `#8a4530` | Shortlist exception |  |  |
| 239 | `#F3F0E9` | Shortlist exception |  |  |
| 239 | `#FBF9F5` | Shortlist exception |  |  |
| 239 | `#2A221A` | Shortlist exception |  |  |
| 239 | `#E07840` | Shortlist exception |  |  |
| 247 | `#FBF9F5` | Shortlist exception |  |  |
| 248 | `#5a4a80` | Shortlist exception |  |  |
| 249 | `#1c140d` | Shortlist exception |  |  |
| 257 | `#080604` | Shortlist exception |  |  |
| 257 | `#1C1814` | Shortlist exception |  |  |
| 257 | `#F0EBE2` | Shortlist exception |  |  |
| 257 | `#E07840` | Shortlist exception |  |  |
| 265 | `#1C1814` | Shortlist exception |  |  |
| 266 | `#5a4a80` | Shortlist exception |  |  |
| 267 | `#f0ebe2` | Shortlist exception |  |  |

### `src/pages/Shortlist.module.css`  — 10 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 146 | `#14110d` | Shortlist exception |  |  |
| 157 | `#fbf9f5` | Shortlist exception |  |  |
| 177 | `#14110d` | Shortlist exception |  |  |
| 193 | `#0f0d0b` | Shortlist exception |  |  |
| 195 | `#0a0806` | Shortlist exception |  |  |
| 233 | `#070504` | Shortlist exception |  |  |
| 236 | `#080604` | Shortlist exception |  |  |
| 269 | `#fff` | Shortlist exception | --surface |  |
| 272 | `#e07840` | Shortlist exception |  |  |
| 313 | `#14110d` | Shortlist exception |  |  |

### `src/pages/case-study-shared.css`  — 10 literals

| line | hex | category | token | note |
|---|---|---|---|---|
| 89 | `#9E644B` | already-tokenized fallback | --clay |  |
| 122 | `#9E644B` | already-tokenized fallback | --clay |  |
| 228 | `#fff` | white/ambiguous | --surface |  |
| 610 | `#D9AC97` | already-tokenized fallback | --clay-edge |  |
| 639 | `#9E644B` | already-tokenized fallback | --clay |  |
| 654 | `#D9AC97` | already-tokenized fallback | --clay-edge |  |
| 656 | `#9E644B` | already-tokenized fallback | --clay |  |
| 668 | `#D9AC97` | already-tokenized fallback | --clay-edge |  |
| 669 | `#fff` | white/ambiguous | --surface |  |
| 977 | `#1F1A0F` | already-tokenized fallback | --ink |  |
