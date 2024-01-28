using System.ComponentModel.DataAnnotations.Schema;

namespace Divider.Models;

public class Item : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  public int? Quantity { get; set; }
  public float Price { get; set; }

  [ForeignKey("ContactId")]
  public int ContactId { get; set; }
}