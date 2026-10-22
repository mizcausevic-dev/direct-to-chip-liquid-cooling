# Direct-to-Chip Liquid Cooling: What the Cold Plate Actually Does

**SEO title:** Direct-to-Chip Liquid Cooling Explained: Cold Plates, CDUs, and the Facility Loop

**Meta description:** How direct-to-chip liquid cooling carries heat from an accelerator package through a cold plate, a CDU, and a separate facility loop, and what that mechanism does not guarantee.

**Slug:** direct-to-chip-liquid-cooling

**Tags:** Data Centers, Liquid Cooling, Infrastructure, Energy, Engineering

**Canonical explainer:** https://mizcausevic-dev.github.io/direct-to-chip-liquid-cooling/

**Subtitle:** A sectional walk through the package, the manifold, and the CDU, for people who have to live with the heat.

---

The heat from an accelerator does not disappear inside the package. Direct-to-chip liquid cooling gives that heat a shorter ride. A cold plate sits on the chip package. Coolant moves through channels inside the plate. The liquid picks up heat and carries it to a coolant distribution unit. A second loop takes that heat to the outside of the building. In the arrangement this essay follows, the two fluids meet only as neighbors across a metal wall. They do not mix.

That is the machine. Everything else is plumbing, control, and a clear account of what the plumbing refuses to promise.

If you want the picture before the prose, the explainer is a 34-second film: 1,020 frames at 30 fps, scrubbable to any frame. It is a selected architecture, drawn as a section, not a product brochure.

https://mizcausevic-dev.github.io/direct-to-chip-liquid-cooling/

## Direct-to-chip means a cold plate

The phrase gets used as if it covered every way to put liquid near a server. The U.S. Department of Energy's July 2024 Best Practice Guide for Data Center Design, section 5.6, sorts liquid cooling into three classes.

Cold plates replace the finned heat sink on a chip. Liquid flows through channels in the plate. A CDU is the usual partner. The same idea can be applied to memory and other hot parts. This is direct-to-chip cooling.

Immersion puts the electronics in a dielectric fluid. Single-phase immersion pumps that fluid. Two-phase immersion boils an engineered fluid and condenses it again. The DOE guide classes both immersion and cold plates as direct liquid cooling. Immersion is a different architecture. The film does not show it.

The third class is a close-coupled air-to-liquid exchanger: a rear door, an enclosed cabinet, an in-row coil. Server air still does the first hop. Liquid takes the heat a short distance later. Useful, and a different drawing.

So when a vendor says "direct-to-chip," ask where the liquid is. In this essay, the liquid is inside the cold plate. It does not intentionally wet the silicon, the lid, or the board.

## Follow the heat, not a logo

Start at the package. Electrical energy enters the server. The electronics turn work into heat in the silicon. A representative section shows a board, a substrate, a die, a package lid, a thermal interface, and the cold plate above them. Some plates bear on a lid. Some bear on a bare die through the interface. The film labels that fork and leaves the circuit itself undrawn. A die photo would pretend to be a product teardown. This is a mechanism.

Heat conducts through the solids: die, lid, thermal interface, cold-plate metal. On the other side of that metal, coolant is already moving. The heat crosses into the flow. Supply enters cooler, in a qualitative sense. Return leaves warmer, in the same qualitative sense. The color shift is a teaching tint. It is not a temperature scale, and it is not a claim about any ASHRAE W class.

From the package, the return runs to a coupling on the server, then into the rack return manifold, then across the hall to the CDU. The film compresses that trip. Real transit takes longer than the tracer. The label says so. Couplings can leak. A drawing of a fitting is not a leak-free warranty.

## The CDU is a border, not a magic box

Most liquid-cooled designs in the DOE guide use a cooling distribution unit. The CDU faces the facility loop on one side and the IT loop on the other. Its job is to hand the IT equipment a liquid at an appropriate temperature, pressure, and chemistry. The guide states the job. It does not hand this essay a setpoint, and the film invents none.

CDU layouts vary. Some are liquid-to-liquid. Some are liquid-to-air. Some sit in the rack, some in the row, some in the plant. The selected drawing is one liquid-to-liquid unit with a plate exchanger, one pump on the IT loop, and one pump on the facility loop. Sensors for flow, temperature, and pressure are marked in violet so you can find them. The traces beside them are illustrative. They are not a log, and they have no units on purpose.

Inside the exchanger, facility channels and IT channels alternate, with metal between them. Gold arrows mark heat crossing that metal. They are not fluid streamlines. Fluid stays on its own side. If a real CDU mixes loops, or uses a different exchanger, this frame is the wrong picture. Say that out loud before you reuse it.

## The facility loop is where the heat leaves

The facility circuit carries the heat the CDU just accepted and rejects it outside the data hall. The film draws that outdoor boundary as a dry-cooler-like coil and fan, because the DOE guide notes that warmer facility water can make dry coolers practical and can cut both energy and water use. Cooling towers, chillers, and economizers are also real choices. The drawing is a boundary, not a specified machine.

Watch the edge of the frame. Heat leaves with the air. It is not erased when the pipe ends. The electrical inlet is marked on the rack for the same reason. A balance with an output and no input is a magic trick. The on-screen balance is qualitative: electricity in, heat in the electronics, a portion carried by coolant, a portion carried by room air, coolant-side heat passed to the facility loop, facility heat rejected outdoors. The split is not measured. Some halls put more of the load on liquid. A few designs capture nearly all of it and drop the fans. This hybrid drawing leaves memory, power delivery, and adapters on air, and says so.

The DOE guide is plain about that hybrid middle. Several liquid-cooled solutions capture a majority of the heat in liquid and leave the rest to air. The guide also says some capture practically all of it without fans, and that those are the most energy-efficient of the set. Efficiency here is a direction, not a percentage I measured.

One historical note from the same section, so it does not get stuck to this rack: the guide says high-performance sites adopted direct liquid cooling as densities grew, citing 60 kW racks observed in 2013 and later densities surpassing 125 kW. That is context for why the plumbing showed up. It is not the nameplate of the rack in the film.

## What the film refuses to claim

A technical animation can do harm by looking more certain than its sources. This one is built to stay inside the mechanism.

It does not claim a leak-free loop. It does not claim that liquid captures every watt. It does not state a flow, a pressure, a coolant chemistry, or a supply temperature. Treated water, glycol mixtures, and dielectrics are all used on IT loops in the field. The drawing picks none of them.

Enlarged scale, slow motion, and time compression are labeled on the frames where they apply. The section is a cut, not an exploded server. Schematic panels use a dashed border so they stay visually distinct from the hardware. Cyan marks transport. A lighter cyan separates the facility circuit from the IT circuit. Gold marks heat or the work of a pump or fan. Violet marks sensing or control. Those colors are overlays. The metal, the fluid, and the thermal interface keep ordinary material colors.

The control beat is an illustrative speed change on the IT-loop pump. It is not a setpoint and not a control narrative you can commission from.

Use the film to brief a team on the path of the heat. Do not use it as a shop drawing, a safety procedure, or a performance guarantee. Before you publish a number, verify it against the hardware, the CDU limits, and the facility design.

## How to watch it

The player is frame-true. The same function draws frame 0 and frame 1019. There is no random source inside the picture. Space plays and pauses. Arrows step. Keys 1 through 5 jump the chapters.

- 0 to 149. The hall: server, cold plates, manifolds, CDU, outdoor boundary.
- 150 to 299. The package section, enlarged and slowed: conduction, then heat entering the coolant.
- 300 to 509. The warmed return, time-compressed, into the rack manifold and the CDU.
- 510 to 749. The two loops, the wall, the pumps, the sensors.
- 750 to 1019. The whole system again, the air-cooled remainder, and a qualitative balance. The camera holds.

Open a frame directly if you are sending someone a still: add `?frame=280` for the package section, or `?frame=720` for the exchanger. `?frame=1019` is the settled system.

## The sentence to keep

Direct-to-chip liquid cooling moves heat from the package to a liquid in a cold plate, then to a CDU, then to a facility loop, then to outside air. The coolant stays in its channels. The facility fluid stays in its own. Heat is transported. It is not destroyed.

That is the claim the sources support. The rest is a drawing, labeled as one.

Source: U.S. Department of Energy, Best Practice Guide for Data Center Design, July 2024, section 5.6, Direct Liquid Cooling. The guide cites ASHRAE TC 9.9, Emergence and Expansion of Liquid Cooling in Mainstream Data Centers, for the classes and the CDU role. This essay does not reproduce those figures. Staging and timing in the film are explanatory.

https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design.pdf
