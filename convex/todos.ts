import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    filter: v.optional(
      v.union(v.literal("all"), v.literal("active"), v.literal("completed"))
    ),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let todos = await ctx.db.query("todos").collect();

    if (args.filter === "active") {
      todos = todos.filter((todo) => !todo.completed);
    } else if (args.filter === "completed") {
      todos = todos.filter((todo) => todo.completed);
    }

    if (args.search) {
      const searchLower = args.search.toLowerCase();
      todos = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchLower))
      );
    }

    return todos.sort((a, b) => a.order - b.order);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existingTodos = await ctx.db.query("todos").collect();
    const maxOrder =
      existingTodos.length > 0
        ? Math.max(...existingTodos.map((t) => t.order))
        : -1;

    const now = Date.now();
    return await ctx.db.insert("todos", {
      title: args.title,
      description: args.description,
      dueDate: args.dueDate,
      completed: false,
      order: maxOrder + 1,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("todos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const toggleComplete = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return await ctx.db.patch(args.id, {
      completed: !todo.completed,
      updatedAt: Date.now(),
    });
  },
});

export const deleteTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const reorder = mutation({
  args: {
    ids: v.array(v.id("todos")),
  },
  handler: async (ctx, args) => {
    for (let i = 0; i < args.ids.length; i++) {
      await ctx.db.patch(args.ids[i], {
        order: i,
        updatedAt: Date.now(),
      });
    }
  },
});

export const clearCompleted = mutation({
  handler: async (ctx) => {
    const completedTodos = await ctx.db
      .query("todos")
      .withIndex("by_completed", (q) => q.eq("completed", true))
      .collect();

    for (const todo of completedTodos) {
      await ctx.db.delete(todo._id);
    }

    return completedTodos.length;
  },
});
