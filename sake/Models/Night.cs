using System.Text.Json.Serialization;

namespace Divider.Models;

public class Night : BaseEntity
{
  public required DateTime Date { get; set; }

  // One night to many places
  public ICollection<Place> Places { get; } = [];

  // Many nights to many contacts
  public List<Contact> Contacts { get; } = [];
}