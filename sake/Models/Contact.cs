using System.Text.Json.Serialization;

namespace Divider.Models;

public class Contact : BaseEntity
{
  public string? Email { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Mobile { get; set; }
  [JsonIgnore]
  public ICollection<Night> Nights { get; set; } = [];
  [JsonIgnore]
  public ICollection<Place> Places { get; set; } = [];
  [JsonIgnore]
  public ICollection<Item> Items { get; set; } = [];
}