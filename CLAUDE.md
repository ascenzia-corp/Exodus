# Exodus 90 - Application de méditations

## Ajouter une nouvelle méditation

Les méditations sont stockées dans `meditations.js` dans l'objet `defaultMeditations`.

### Structure d'une méditation

```javascript
"64": {
  "title": "Titre de la méditation",
  "scripture": "Livre X, 1-10",
  "intro": "Texte d'introduction (optionnel)...",
  "openingPrayer": "Prière d'ouverture...",
  "reading": "Texte biblique...",
  "reflection": "Réflexion...",
  "closingPrayer": "Prière de clôture..."
}
```

### Noms des champs (IMPORTANT)

| Champ | Usage |
|-------|-------|
| `title` | Titre de la méditation |
| `scripture` | Référence biblique (PAS `reference`) |
| `intro` | Introduction/message aux frères (PAS `introduction`) |
| `openingPrayer` | Prière d'ouverture |
| `reading` | Lecture du jour |
| `reflection` | Réflexion |
| `closingPrayer` | Prière de clôture |

### Formatage

- Utiliser `\n\n` pour les sauts de paragraphe
- Échapper les guillemets doubles avec `\"` (ex: `il dit : \"Bonjour\"`)
- Ajouter une virgule après l'accolade fermante du jour précédent
- Vérifier la syntaxe avec `node -c meditations.js`

### Exemple d'ajout

Après le jour 63 :
```javascript
    "closingPrayer": "..."
  },  // <- VIRGULE ICI
  "64": {
    "title": "La tentation de la rébellion",
    "scripture": "Nombres 16, 1-11",
    ...
  }
};
```

## Branche de développement

Branche principale : `claude/exodus-meditation-app-znWYM`
