# Draft 24: Frequency Gravity

- Each object already carries a 0-1 composition weight for Argentina, Collaboration, Travel, Food, NYC, Healthcare, and Art.
- The active weights are now combined into an explicit central-attraction score.
- `central attraction = sum of active frequency weights / number of active frequencies`.
- In the 3+ relationship field, `target radius = 155 + (1 - central attraction) * 340` before pairwise forces settle the neighborhood.
- Walter's example of Art `0.36`, Food `0.36`, Argentina `0.10`, and NYC `0.24` produces a central attraction of `0.265` and an initial target radius of about `405`.
- Central attraction controls radial position: stronger combined attraction moves inward; weaker attraction remains farther from the current center.
- Pairwise relationship strength still controls neighborhood and separation, so the field communicates both composition and connection.
- One- and two-lens layouts retain their approved grammar while gaining weight-sensitive radii.
- Every rendered object exposes `data-central-attraction` for visual and numerical auditing.
