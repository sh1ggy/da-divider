using System.ComponentModel.DataAnnotations.Schema;

namespace Divider.Models;

public class Place : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  [ForeignKey("ContactIds")]
  public List<int> ContactIds { get; set; } = new List<int>();
}