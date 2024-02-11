using System.Text.Json.Serialization;

namespace Divider.Models;

public class Night : BaseEntity
{
  public required DateTime Date { get; set; }

  // One night to many places
  [JsonIgnore]
  public ICollection<Place> Places { get; } = [];

  // Many nights to many contacts
  [JsonIgnore]
  public List<Contact> Contacts { get; } = [];
}