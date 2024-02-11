namespace Divider.Models;

public class Contact : BaseEntity
{
  public string? Email { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Mobile { get; set; }
  public List<Night> Nights { get; } = [];
  public List<Place> Places { get; } = [];
}