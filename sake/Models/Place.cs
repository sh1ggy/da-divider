using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Divider.Models;

public class Place : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  // Many places to one night
  public int NightId { get; set; } // FK property
  public Night Night { get; set; } = null!; // Reference navigation to principal

  // Many places to many contacts
  [JsonIgnore]
  public List<Contact> Contacts { get; } = [];
}
